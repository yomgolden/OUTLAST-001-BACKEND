const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String, default: "Survivor" },
  gold: { type: Number, default: 500 },
  gems: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
