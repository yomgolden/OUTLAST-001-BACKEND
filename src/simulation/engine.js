const TOOLS = [
  "Knife", "Charm", "Juju", "Smoke",
  "Sharp mouth", "Silence", "Connections"
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fill = (t, d) => t.replace(/\{(\w+)\}/g, (_, k) => d[k] || k);

const xpForLevel = (level) => level * level * 50;

const computeLevel = (totalXP) => {
  let level = 1;
  while (totalXP >= xpForLevel(level + 1)) level++;
  return level;
};

const generateMatch = (players, eventConfig) => {
  const eliminationOrder = [];
  let alive = players.map(p => ({ ...p, alive: true }));

  const minRounds = eventConfig.roundConfig?.min || 5;
  const maxRounds = eventConfig.roundConfig?.max || 7;

  const rounds =
    Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds;

  const survivalChance =
    eventConfig.roundConfig?.survivalChance || 0.12;

  const funnyChance =
    eventConfig.roundConfig?.funnyChance || 0.28;

  const worldEventChance =
    eventConfig.roundConfig?.worldEventChance || 0.35;

  const storyRounds = [];

  // INTRO
  if (eventConfig.intro?.length) {
    storyRounds.push({
      round: 0,
      type: "INTRO",
      narration: null,

      events: eventConfig.intro.map(line => ({
        type: "intro",
        intensity: "medium",
        message: line
      })),

      eliminated: [],
      aliveCount: alive.length
    });
  }

  for (let round = 1; round <= rounds; round++) {
    if (alive.length <= 3) break;

    const roundEliminated = [];

    const roundEvents = [];

    const narration = pick(eventConfig.narration);

    const eventCount = Math.floor(Math.random() * 4) + 3;

    // ROUND EVENT FIRST
    roundEvents.push({
      type: "round",
      intensity: "low",
      message: `ROUND ${round}`
    });

    // NARRATION ALWAYS SECOND
    roundEvents.push({
      type: "narration",
      intensity: "medium",
      message: narration
    });

    // OPTIONAL WORLD EVENT AFTER NARRATION
    if (
      eventConfig.worldEvents?.length &&
      Math.random() < worldEventChance
    ) {
      roundEvents.push({
        type: "world",
        intensity: "high",
        message: pick(eventConfig.worldEvents)
      });
    }

    for (let i = 0; i < eventCount; i++) {
      if (alive.length <= 3) break;

      const living = alive.filter(p => p.alive);

      if (living.length < 2) break;

      const victim = pick(living);

      if (!victim) continue;

      const killers = living.filter(
        p => p.userId !== victim.userId
      );

      if (!killers.length) continue;

      const killer = pick(killers);

      const tool = pick(TOOLS);

      const roll = Math.random();

      // SURVIVAL EVENT
      if (roll < survivalChance) {
        roundEvents.push({
          type: "survival",
          intensity: "medium",

          victim: victim.username,

          message: fill(
            pick(eventConfig.survival),
            {
              victim: victim.username
            }
          )
        });

        continue;
      }

      // KILL PLAYER
      alive = alive.map(p =>
        p.userId === victim.userId
          ? { ...p, alive: false }
          : p
      );

      roundEliminated.push(victim.username);

      eliminationOrder.push(victim);

      // FUNNY DEATH
      if (roll < funnyChance) {
        roundEvents.push({
          type: "funny",
          intensity: "low",

          victim: victim.username,

          message: fill(
            pick(eventConfig.funny),
            {
              victim: victim.username
            }
          )
        });
      }

      // NORMAL ELIMINATION
      else {
        roundEvents.push({
          type: "elimination",
          intensity: "high",

          killer: killer.username,
          victim: victim.username,

          message: fill(
            pick(eventConfig.eliminations),
            {
              victim: victim.username,
              killer: killer.username,
              tool
            }
          )
        });
      }

      // RANDOM WORLD EVENT BETWEEN ACTIONS
      if (
        eventConfig.worldEvents?.length &&
        Math.random() < worldEventChance * 0.5
      ) {
        roundEvents.push({
          type: "world",
          intensity: "medium",
          message: pick(eventConfig.worldEvents)
        });
      }
    }

    // FILTER LIVING PLAYERS
    alive = alive.filter(p => p.alive);

    // SYSTEM EVENT AT ROUND END
    roundEvents.push({
      type: "system",
      intensity: "low",
      message: `${alive.length} survivors remain.`
    });

    storyRounds.push({
      round,
      type: "ROUND",
      narration,
      events: roundEvents,
      eliminated: roundEliminated,
      aliveCount: alive.length
    });
  }

  // PLACEMENTS
  const winner =
    alive[0] || eliminationOrder[eliminationOrder.length - 1];

  const otherSurvivors =
    alive.filter(p => p.userId !== winner?.userId);

  const placements = [
    winner,
    ...otherSurvivors,
    ...[...eliminationOrder].reverse()
  ].filter(Boolean);

  // MATCH END
  storyRounds.push({
    round: rounds + 1,

    type: "MATCH_END",

    narration: null,

    events: [
      {
        type: "system",
        intensity: "medium",
        message: "MATCH COMPLETE"
      }
    ],

    eliminated: [],

    aliveCount: alive.length,

    winner: winner?.username || null
  });

  return {
    storyRounds,
    placements,
    winner
  };
};

const goldForPlacement = (placement) => {
  if (placement === 1) return 250;
  if (placement === 2) return 150;
  if (placement === 3) return 100;
  if (placement <= 5) return 50;
  if (placement <= 10) return 30;

  return 20;
};

const XP_PER_MATCH = 10;

/*
=====================================
RP SYSTEM
=====================================
*/

const rpForPlacement =
  (placement) => {

    if (placement === 1)
      return 120;

    if (placement === 2)
      return 90;

    if (placement === 3)
      return 70;

    if (placement <= 5)
      return 50;

    if (placement <= 10)
      return 30;

    if (placement <= 15)
      return 10;

    return 0;
  };

module.exports = {
  generateMatch,
  goldForPlacement,
  XP_PER_MATCH,
  xpForLevel,
  computeLevel
};

