const BOTS = [
  "BigSapa","GhostOfYaba","BabaFlex","FearWomen",
  "DanfoKing","AreaFather","SapaGeneral","AbokiSniper",
  "Chairman","SoftLifeGone","LagosWizard","EkoBandit",
  "NoGree4Anybody","YahooProtector","IjebuLord","StreetOracle",
  "MushínKing","AjegunleFather","OldBoy","LastBorn"
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
