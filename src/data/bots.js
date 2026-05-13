const BOTS = [
  "BigSapa","Doctor Oyenusi","Maliki","FearWomen",
  "Evans","AreaFather","SapaGeneral","AbokiSniper",
  "Chairman","Badoo","gehgeh","EkoBandit",
  "BabaTunde","SamLarry","Shina Rambo","StreetOracle",
  "MushínKing","Lawrence Anini","OldBoy","LastBorn"
];

module.exports = (count) => {
  const shuffled = [...BOTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((name, i) => ({
    userId: `bot_${Date.now()}_${i}`,
    username: name,
    bot: true,
    alive: true
  }));
};
