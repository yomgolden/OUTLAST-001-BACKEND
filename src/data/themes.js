const THEMES = [
  { name: "Mushin Nightmare", location: "Mushin", danger: "HIGH" },
  { name: "Blackout in Yaba", location: "Yaba", danger: "EXTREME" },
  { name: "Flood Escape", location: "Makoko", danger: "HIGH" },
  { name: "Ajegunle Chaos", location: "Ajegunle", danger: "MEDIUM" },
  { name: "The Last Danfo", location: "Lagos Island", danger: "HIGH" },
  { name: "Aba Underground", location: "Aba", danger: "EXTREME" },
  { name: "Ibadan Uprising", location: "Ibadan", danger: "HIGH" }
];

module.exports = () => THEMES[Math.floor(Math.random() * THEMES.length)];
