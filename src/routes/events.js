const router = require("express").Router();

const User = require("../models/User");
const memory = require("../data/memory");
const createBots = require("../data/bots");

const {
  getEvent,
  getFeatured
} = require("../data/eventRegistry");

const {
  generateMatch,
  goldForPlacement,
  XP_PER_MATCH,
  computeLevel
} = require("../simulation/engine");

const MAX = 20;
const COUNTDOWN = 60000;

// ======================================================
// START EVENT
// ======================================================

const startEvent = async (eventId) => {
  const event = memory[eventId];
  if (!event || event.status !== "WAITING") return;

  const needed = MAX - event.players.length;
  if (needed > 0) event.players.push(...createBots(needed));

  event.status = "STARTED";

  const eventConfig = getEvent(event.eventType);
  if (!eventConfig) {
    console.error("INVALID EVENT TYPE:", event.eventType);
    return;
  }

  const { storyRounds, placements, winner } = generateMatch(
    event.players,
    eventConfig
  );

  // Store both for compatibility
  event.storyRounds = storyRounds || [];
  event.feed = storyRounds || [];
  event.winner = winner?.username || null;

  event.finalResults = placements.map((player, index) => ({
    placement: index + 1,
    username: player.username,
    userId: player.userId,
    bot: player.bot,
    goldEarned: goldForPlacement(index + 1),
    xpEarned: XP_PER_MATCH
  }));

  event.status = "ENDED";

  console.log(
    "EVENT ENDED:", eventId,
    "| WINNER:", winner?.username,
    "| ROUNDS:", storyRounds?.length || 0
  );

  for (const result of event.finalResults) {
    if (!result.bot && result.userId && result.userId.length === 24) {
      try {
        const user = await User.findById(result.userId);
        if (user) {
          user.gold += result.goldEarned;
          user.xp += result.xpEarned;
          user.matches += 1;
          if (result.placement === 1) user.wins += 1;
          user.level = computeLevel(user.xp);
          await user.save();
        }
      } catch (err) {
        console.error("REWARD ERROR:", err.message);
      }
    }
  }

  setTimeout(() => {
    delete memory[eventId];
    console.log("EVENT CLEANED:", eventId);
  }, 600000);
};

// ======================================================
// FEATURED EVENTS
// ======================================================

router.get("/featured", (req, res) => {
  try {
    const featured = getFeatured();
    const now = Date.now();

    const result = featured.map((eventConfig) => {
      const activeLobbies = Object.values(memory).filter(
        (lobby) =>
          lobby.eventType === eventConfig.id &&
          lobby.status === "WAITING"
      );

      const bestLobby = activeLobbies.sort(
        (a, b) => b.players.length - a.players.length
      )[0] || null;

      return {
        id: eventConfig.id,
        name: eventConfig.name,
        location: eventConfig.location,
        danger: eventConfig.danger,
        tagline: eventConfig.tagline,
        activePlayers: activeLobbies.reduce(
          (sum, lobby) => sum + lobby.players.length, 0
        ),
        activeLobbies: activeLobbies.length,
        bestLobby: bestLobby ? {
          eventId: bestLobby.eventId,
          playerCount: bestLobby.players.length,
          maxPlayers: MAX,
          countdown: Math.max(
            0,
            Math.floor((bestLobby.startsAt - now) / 1000)
          )
        } : null
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================================
// GET ACTIVE LOBBIES
// ======================================================

router.get("/", (req, res) => {
  try {
    const now = Date.now();
    const list = Object.values(memory)
      .filter((event) =>
        event.status === "WAITING" ||
        event.status === "STARTED"
      )
      .map((event) => ({
        eventId: event.eventId,
        eventType: event.eventType,
        theme: event.theme,
        location: event.location,
        danger: event.danger,
        host: event.host,
        playerCount: event.players.length,
        maxPlayers: MAX,
        countdown: Math.max(
          0,
          Math.floor((event.startsAt - now) / 1000)
        ),
        status: event.status
      }));

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================================
// CREATE EVENT / AUTO JOIN
// ======================================================

router.post("/create", async (req, res) => {
  try {
    const { userId, username, eventType } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId required" });
    }

    const eventConfig = getEvent(eventType || "mushin_nightmare");
    if (!eventConfig) {
      return res.status(400).json({ error: "Invalid event type" });
    }

    // Auto join existing waiting lobby first
    const existingLobbies = Object.values(memory).filter(
      (event) =>
        event.eventType === eventConfig.id &&
        event.status === "WAITING"
    );

    if (existingLobbies.length > 0) {
      const lobby = existingLobbies.sort(
        (a, b) => b.players.length - a.players.length
      )[0];

      if (!lobby.players.find((player) => player.userId === userId)) {
        lobby.players.push({
          userId,
          username: username || "Survivor",
          bot: false,
          alive: true
        });
      }

      if (lobby.players.length >= MAX) startEvent(lobby.eventId);

      console.log("AUTO JOINED:", lobby.eventId);
      return res.json(lobby);
    }

    // Create new lobby
    const eventId = `event_${Date.now()}_${Math.floor(Math.random() * 9999)}`;

    const event = {
      eventId,
      eventType: eventConfig.id,
      theme: eventConfig.name,
      location: eventConfig.location,
      danger: eventConfig.danger,
      tagline: eventConfig.tagline,
      host: username || "Survivor",
      status: "WAITING",
      players: [{
        userId,
        username: username || "Survivor",
        bot: false,
        alive: true
      }],
      startsAt: Date.now() + COUNTDOWN,
      storyRounds: [],
      feed: [],
      finalResults: null
    };

    memory[eventId] = event;
    setTimeout(() => startEvent(eventId), COUNTDOWN);

    console.log("NEW LOBBY CREATED:", eventId, "| TYPE:", eventConfig.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================================
// JOIN EVENT
// ======================================================

router.post("/join", async (req, res) => {
  try {
    const { eventId, userId, username } = req.body;
    const event = memory[eventId];

    if (!event) return res.status(404).json({ error: "Lobby not found" });
    if (event.status !== "WAITING") return res.status(400).json({ error: "Already started" });

    if (!event.players.find((player) => player.userId === userId)) {
      event.players.push({
        userId,
        username: username || "Survivor",
        bot: false,
        alive: true
      });
    }

    if (event.players.length >= MAX) startEvent(eventId);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================================
// EVENT STATUS
// ======================================================

router.get("/:eventId/status", (req, res) => {
  try {
    const event = memory[req.params.eventId];
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({
      eventId: event.eventId,
      eventType: event.eventType,
      theme: event.theme,
      location: event.location,
      danger: event.danger,
      tagline: event.tagline,
      status: event.status,
      countdown: Math.max(
        0,
        Math.floor((event.startsAt - Date.now()) / 1000)
      ),
      players: event.players,
      playerCount: event.players.length,
      maxPlayers: MAX
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================================================
// EVENT FEED
// ======================================================

router.get("/:eventId/feed", (req, res) => {
  try {
    const event = memory[req.params.eventId];
    if (!event) return res.status(404).json({ error: "Event not found" });

    const alivePlayers = event.players.filter((p) => p.alive);

    res.json({
      status: event.status,
      storyRounds: event.storyRounds || [],
      feed: event.feed || [],
      finalResults: event.finalResults || null,
      winner: event.winner || null,
      aliveCount: alivePlayers.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
