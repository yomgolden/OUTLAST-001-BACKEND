const ELIMINATIONS = [
  "{killer} followed {victim} into a dark corner of {location}. Only {killer} came back.",
  "{victim} tried to negotiate with {killer}. {killer} said nothing. Did everything.",
  "{victim} underestimated {killer} in {location}. Classic mistake.",
  "{killer} set a trap in {location}. {victim} walked straight into it.",
  "The streets of {location} claimed {victim} after {killer} made a move nobody saw coming.",
  "{victim} thought they had allies in {location}. {killer} corrected that assumption.",
  "{killer} waited for {victim} at the only exit. Patience paid off.",
  "{victim} ran. {killer} ran faster. {location} watched in silence.",
  "{killer} used {tool} on {victim} in {location}. No witnesses. No mercy.",
  "{victim} spoke last words in {location}. Nobody remembers them."
];

const NARRATORS = [
  "The air in {location} shifts. Something dangerous is coming.",
  "A strange calm falls over {location}. Survivors know what that means.",
  "{location} has seen too much blood. Tonight adds to the count.",
  "The district of {location} does not forgive weakness.",
  "Somewhere in {location}, an alliance is forming. Somewhere else, it is already broken.",
  "Rain begins to fall over {location}. The survivors barely notice.",
  "Old scores are being settled in {location} tonight.",
  "{location} smells like danger and bad decisions."
];

const FUNNY = [
  "{victim} died arguing about football in the middle of a survival match.",
  "{victim} stopped to eat suya. Did not finish the suya.",
  "{victim} sent their final location to the wrong person.",
  "{victim} had one job. Did not do the job.",
  "{victim} tripped over their own aggression.",
  "{victim} was eliminated by someone they had just insulted online."
];

const SURVIVAL = [
  "{victim} escaped certain death by hiding inside an abandoned danfo.",
  "{victim} bribed their way past danger. Survival of the richest.",
  "Against all odds, {victim} survived another round in {location}.",
  "{victim} disappeared into the crowd. Nobody could track them down.",
  "{victim} found a way out nobody else saw."
];

const LOCATIONS = ["Yaba","Mushin","Ajegunle","Makoko","Lagos Island","Aba","Ibadan"];
const TOOLS = ["Knife","Charm","Juju","Smoke","Sharp mouth","Connections","Silence"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fill = (t, d) => t.replace(/\{(\w+)\}/g, (_, k) => d[k] || k);

const generateMatch = (players) => {
  const feed = [];
  let alive = players.map(p => ({ ...p, alive: true }));
  const rounds = Math.floor(Math.random() * 2) + 5;

  for (let round = 1; round <= rounds; round++) {
    if (alive.length <= 3) break;

    const loc = pick(LOCATIONS);

    feed.push({
      type: "ROUND_START",
      round,
      aliveCount: alive.length,
      message: `— ROUND ${round} — ${alive.length} SURVIVORS REMAIN —`
    });

    feed.push({
      type: "NARRATOR",
      round,
      aliveCount: alive.length,
      message: fill(pick(NARRATORS), { location: loc })
    });

    const eventCount = Math.floor(Math.random() * 4) + 3;
    const eliminated = [];

    for (let i = 0; i < eventCount; i++) {
      if (alive.length <= 3) break;

      const living = alive.filter(p => p.alive);
      if (living.length < 2) break;

      const victim = pick(living);
      const killers = living.filter(p => p.userId !== victim.userId);
      if (!killers.length) continue;
      const killer = pick(killers);
      const tool = pick(TOOLS);
      const loc2 = pick(LOCATIONS);
      const roll = Math.random();

      if (roll < 0.12) {
        feed.push({
          type: "SURVIVAL",
          round,
          aliveCount: alive.filter(p => p.alive).length,
          message: fill(pick(SURVIVAL), { victim: victim.username, location: loc2 })
        });
        continue;
      }

      victim.alive = false;
      eliminated.push(victim);

      if (roll < 0.28) {
        feed.push({
          type: "FUNNY_DEATH",
          round,
          aliveCount: alive.filter(p => p.alive).length,
          message: fill(pick(FUNNY), { victim: victim.username })
        });
      } else {
        feed.push({
          type: "ELIMINATION",
          round,
          aliveCount: alive.filter(p => p.alive).length,
          message: fill(pick(ELIMINATIONS), {
            victim: victim.username,
            killer: killer.username,
            tool,
            location: loc2
          })
        });
      }
    }

    alive = alive.filter(p => p.alive);

    feed.push({
      type: "ROUND_END",
      round,
      aliveCount: alive.length,
      message: `${eliminated.length} eliminated. ${alive.length} remain.`
    });
  }

  feed.push({
    type: "MATCH_END",
    aliveCount: alive.length,
    message: "— MATCH COMPLETE —"
  });

  return { feed, survivors: alive };
};

module.exports = { generateMatch };
