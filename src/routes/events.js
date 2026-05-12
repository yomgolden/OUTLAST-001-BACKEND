const router = require("express").Router();
const User = require("../models/User");
const memory = require("../data/memory");
const createBots = require("../data/bots");
const randomTheme = require("../data/themes");
const { generateMatch } = require("../simulation/engine");

const MAX = 20;
const COUNTDOWN = 60000;

const startEvent = async (eventId) => {
  const event = memory[eventId];
  if (!event || event.status !== "WAITING") return;

  const needed = MAX - event.players.length;
  if (needed > 0) event.players.push(...createBots(needed));

  event.status = "STARTED";

  const { feed, survivors } = generateMatch(event.players);
  event.feed = feed;

  const rewards = { 1: 250, 2: 150, 3: 100 };
  event.finalResults = survivors.map((p, i) => ({
    placement: i + 1,
    username: p.username,
    userId: p.userId,
    bot: p.bot,
    goldEarned: rewards[i + 1] || 20,
    xpEarned: Math.max(20, 120 - (i + 1) * 4)
  }));

  event.status = "ENDED";
  console.log("EVENT ENDED:", eventId, "| FEED:", feed.length, "items");

  for (const r of event.finalResults) {
    if (!r.bot && r.userId && r.userId.length === 24) {
      try {
        const user = await User.findById(r.userId);
        if (user) {
          user.gold += r.goldEarned;
          user.xp += r.xpEarned;
          user.matches += 1;
          if (r.placement === 1) user.wins += 1;
          if (user.xp >= user.level * 500) user.level += 1;
          await user.save();
        }
      } catch (e) {
        console.error("REWARD ERROR:", e.message);
      }
    }
  }

  setTimeout(() => { delete memory[eventId]; }, 600000);
};

router.get("/", (req, res) => {
  try {
    const now = Date.now();
    const list = Object.values(memory)
      .filter(e => e.status === "WAITING" || e.status === "STARTED")
      .map(e => ({
        eventId: e.eventId,
        theme: e.theme,
        location: e.location,
        danger: e.danger,
        host: e.host,
        playerCount: e.players.length,
        maxPlayers: MAX,
        countdown: Math.max(0, Math.floor((e.startsAt - now) / 1000)),
        status: e.status
      }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { userId, username } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const waiting = Object.values(memory).filter(e => e.status === "WAITING");
    if (waiting.length >= 5) return res.status(400).json({ error: "Too many active events" });

    const theme = randomTheme();
    const eventId = "event_" + Date.now();

    const event = {
      eventId,
      theme: theme.name,
      location: theme.location,
      danger: theme.danger,
      host: username || "Survivor",
      status: "WAITING",
      players: [{ userId, username: username || "Survivor", bot: false, alive: true }],
      startsAt: Date.now() + COUNTDOWN,
      feed: [],
      finalResults: null
    };

    memory[eventId] = event;
    setTimeout(() => startEvent(eventId), COUNTDOWN);

    console.log("EVENT CREATED:", eventId);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/join", async (req, res) => {
  try {
    const { eventId, userId, username } = req.body;
    const event = memory[eventId];
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.status !== "WAITING") return res.status(400).json({ error: "Already started" });

    if (!event.players.find(p => p.userId === userId)) {
      event.players.push({ userId, username: username || "Survivor", bot: false, alive: true });
    }

    if (event.players.length >= MAX) startEvent(eventId);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:eventId/status", (req, res) => {
  try {
    const event = memory[req.params.eventId];
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({
      eventId: event.eventId,
      theme: event.theme,
      location: event.location,
      danger: event.danger,
      status: event.status,
      countdown: Math.max(0, Math.floor((event.startsAt - Date.now()) / 1000)),
      players: event.players,
      playerCount: event.players.length,
      maxPlayers: MAX
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:eventId/feed", (req, res) => {
  try {
    const event = memory[req.params.eventId];
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({
      status: event.status,
      feed: event.feed || [],
      finalResults: event.finalResults || null,
      aliveCount: event.players.filter(p => p.alive).length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
