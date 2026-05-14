const TOOLS = ["Knife", "Charm", "Juju", "Smoke", "Sharp mouth", "Silence", "Connections"];

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
  const rounds = Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds;
  const survivalChance = eventConfig.roundConfig?.survivalChance || 0.12;
  const funnyChance = eventConfig.roundConfig?.funnyChance || 0.28;
  const worldEventChance = eventConfig.roundConfig?.worldEventChance || 0.35;

  const storyRounds = [];

  // INTRO as round 0
  if (eventConfig.intro?.length) {
    storyRounds.push({
      round: 0,
      type: "INTRO",
      narration: null,
      events: eventConfig.intro.map(line => ({
        type: "INTRO",
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

    // Pick narration (1st person)
    const narration = pick(eventConfig.narration);

    const eventCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < eventCount; i++) {
      if (alive.length <= 3) break;

      const living = alive.filter(p => p.alive);
      if (living.length < 2) break;

      // Inject world event randomly between kills
      if (
        eventConfig.worldEvents?.length &&
        Math.random() < worldEventChance &&
        roundEvents.length > 0
      ) {
        roundEvents.push({
          type: "WORLD_EVENT",
          message: pick(eventConfig.worldEvents)
        });
      }

      const victim = pick(living);
      if (!victim) continue;

      const killers = living.filter(p => p.userId !== victim.userId);
      if (!killers.length) continue;
      const killer = pick(killers);
      const tool = pick(TOOLS);
      const roll = Math.random();

      if (roll < survivalChance) {
        roundEvents.push({
          type: "SURVIVAL",
          message: fill(pick(eventConfig.survival), {
            victim: victim.username
          })
        });
        continue;
      }

      victim.alive = false;
      roundEliminated.push(victim.username);
      eliminationOrder.push(victim);

      if (roll < funnyChance) {
        roundEvents.push({
          type: "FUNNY_DEATH",
          victim: victim.username,
          message: fill(pick(eventConfig.funny), {
            victim: victim.username
          })
        });
      } else {
        roundEvents.push({
          type: "ELIMINATION",
          killer: killer.username,
          victim: victim.username,
          message: fill(pick(eventConfig.eliminations), {
            victim: victim.username,
            killer: killer.username,
            tool
          })
        });
      }
    }

    // Trailing world event at end of round
    if (
      eventConfig.worldEvents?.length &&
      Math.random() < worldEventChance
    ) {
      roundEvents.push({
        type: "WORLD_EVENT",
        message: pick(eventConfig.worldEvents)
      });
    }

    alive = alive.filter(p => p.alive);

    storyRounds.push({
      round,
      type: "ROUND",
      narration,
      events: roundEvents,
      eliminated: roundEliminated,
      aliveCount: alive.length
    });
  }

  // Final survivors + placements
  const placements = [...alive, ...[...eliminationOrder].reverse()];

  // Match end round
  storyRounds.push({
    round: rounds + 1,
    type: "MATCH_END",
    narration: null,
    events: [{
      type: "MATCH_END",
      message: "MATCH COMPLETE"
    }],
    eliminated: [],
    aliveCount: alive.length,
    winner: alive[0]?.username || placements[0]?.username
  });

  return { storyRounds, placements, winner: alive[0] || placements[0] };
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

module.exports = { generateMatch, goldForPlacement, XP_PER_MATCH, xpForLevel, computeLevel };
