const TOOLS = [
  "Knife",
  "Charm",
  "Juju",
  "Smoke",
  "Sharp mouth",
  "Silence",
  "Connections"
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fill = (template, data) =>
  template.replace(/\{(\w+)\}/g, (_, k) => data[k] || k);

// ======================
// XP + LEVEL SYSTEM
// ======================

const xpForLevel = (level) => level * level * 50;

const computeLevel = (totalXP) => {
  let level = 1;

  while (totalXP >= xpForLevel(level + 1)) {
    level++;
  }

  return level;
};

// ======================
// MATCH ENGINE
// ======================

const generateMatch = (players, eventConfig) => {
  const feed = [];
  const eliminationOrder = [];

  let alive = players.map((p) => ({
    ...p,
    alive: true
  }));

  // ======================
  // EVENT PACING
  // ======================

  const minRounds = eventConfig.roundConfig?.min || 5;
  const maxRounds = eventConfig.roundConfig?.max || 7;

  const rounds =
    Math.floor(Math.random() * (maxRounds - minRounds + 1)) +
    minRounds;

  const survivalChance =
    eventConfig.roundConfig?.survivalChance || 0.12;

  const funnyChance =
    eventConfig.roundConfig?.funnyChance || 0.28;

  // ======================
  // INTRO
  // ======================

  if (eventConfig.intro?.length) {
    eventConfig.intro.forEach((line) => {
      feed.push({
        type: "INTRO",
        aliveCount: alive.length,
        message: line
      });
    });
  }

  // ======================
  // MAIN MATCH LOOP
  // ======================

  for (let round = 1; round <= rounds; round++) {
    if (alive.length <= 1) break;

    feed.push({
      type: "ROUND_START",
      round,
      aliveCount: alive.length,
      message: `— ROUND ${round} — ${alive.length} SURVIVORS REMAIN —`
    });

    // Narration
    feed.push({
      type: "NARRATOR",
      round,
      aliveCount: alive.length,
      message: pick(eventConfig.narration)
    });

    const eventCount = Math.floor(Math.random() * 4) + 3;

    const roundEliminated = [];

    for (let i = 0; i < eventCount; i++) {
      if (alive.length <= 1) break;

      const living = alive.filter((p) => p.alive);

      if (living.length < 2) break;

      const victim = pick(living);

      const killers = living.filter(
        (p) => p.userId !== victim.userId
      );

      if (!killers.length) continue;

      const killer = pick(killers);

      const roll = Math.random();

      // ======================
      // SURVIVAL EVENT
      // ======================

      if (roll < survivalChance) {
        feed.push({
          type: "SURVIVAL",
          round,
          aliveCount: living.length,
          message: fill(
            pick(eventConfig.survival),
            {
              victim: victim.username
            }
          )
        });

        continue;
      }

      // ======================
      // ELIMINATION
      // ======================

      victim.alive = false;

      roundEliminated.push(victim);

      eliminationOrder.push(victim);

      // ======================
      // FUNNY DEATH
      // ======================

      if (roll < survivalChance + funnyChance) {
        feed.push({
          type: "FUNNY_DEATH",
          round,
          aliveCount: living.length - 1,
          message: fill(
            pick(eventConfig.funny),
            {
              victim: victim.username
            }
          )
        });
      }

      // ======================
      // NORMAL ELIMINATION
      // ======================

      else {
        feed.push({
          type: "ELIMINATION",
          round,
          aliveCount: living.length - 1,
          message: fill(
            pick(eventConfig.eliminations),
            {
              victim: victim.username,
              killer: killer.username,
              tool: pick(TOOLS)
            }
          )
        });
      }
    }

    // Remove dead players
    alive = alive.filter((p) => p.alive);

    // ======================
    // ROUND END
    // ======================

    feed.push({
      type: "ROUND_END",
      round,
      aliveCount: alive.length,
      message: `${roundEliminated.length} eliminated. ${alive.length} remain.`
    });

    // ======================
    // ATMOSPHERE
    // ======================

    if (
      round < rounds &&
      alive.length > 1 &&
      eventConfig.atmosphere?.length
    ) {
      feed.push({
        type: "ATMOSPHERE",
        round,
        aliveCount: alive.length,
        message: pick(eventConfig.atmosphere)
      });
    }
  }

  // ======================
  // FORCE FINAL WINNER
  // ======================

  while (alive.length > 1) {
    const victim = pick(alive);

    victim.alive = false;

    eliminationOrder.push(victim);

    feed.push({
      type: "FINAL_ELIMINATION",
      aliveCount: alive.length - 1,
      message: fill(
        pick(eventConfig.eliminations),
        {
          victim: victim.username,
          killer: "The night",
          tool: pick(TOOLS)
        }
      )
    });

    alive = alive.filter((p) => p.alive);
  }

  // ======================
  // FINAL PLACEMENTS
  // ======================

  const placements = [
    ...alive,
    ...[...eliminationOrder].reverse()
  ];

  const winner = placements[0] || null;

  // ======================
  // MATCH END
  // ======================

  feed.push({
    type: "MATCH_END",
    aliveCount: alive.length,
    message: "— MATCH COMPLETE —"
  });

  return {
    feed,
    placements,
    winner
  };
};

// ======================
// GOLD REWARDS
// ======================

const goldForPlacement = (placement) => {
  if (placement === 1) return 250;

  if (placement === 2) return 150;

  if (placement === 3) return 100;

  if (placement <= 5) return 50;

  if (placement <= 10) return 30;

  return 20;
};

// ======================
// XP REWARD
// ======================

const XP_PER_MATCH = 10;

// ======================
// EXPORTS
// ======================

module.exports = {
  generateMatch,
  goldForPlacement,
  XP_PER_MATCH,
  xpForLevel,
  computeLevel
};
