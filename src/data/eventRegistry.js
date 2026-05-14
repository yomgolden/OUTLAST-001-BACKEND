const mushinNightmare = require("../simulation/events/mushinNightmare");
const blackoutYaba = require("../simulation/events/blackoutYaba");
const ajegunleWarzone = require("../simulation/events/ajegunleWarzone");
const evilForest = require("../simulation/events/evilForest");

// ======================================================
// EVENT REGISTRY
// ======================================================

const REGISTRY = {
  mushin_nightmare: mushinNightmare,

  blackout_yaba: blackoutYaba,

  ajegunle_warzone: ajegunleWarzone,
  
  evil_forest: evilForest
};

// ======================================================
// FEATURED EVENTS
// ======================================================

const FEATURED = [
  mushinNightmare,
  blackoutYaba,
  ajegunleWarzone,
  evilForest
];

// ======================================================
// HELPERS
// ======================================================

const getEvent = (id) => {
  return REGISTRY[id] || null;
};

const getFeatured = () => {
  return FEATURED;
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  REGISTRY,
  FEATURED,
  getEvent,
  getFeatured
};
