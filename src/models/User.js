const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  telegramId: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    default: "Survivor"
  },

  firstName: {
    type: String,
    default: ""
  },

  photoUrl: {
    type: String,
    default: ""
  },

  gold: {
    type: Number,
    default: 500
  },

  gems: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  xp: {
    type: Number,
    default: 0
  },

  wins: {
    type: Number,
    default: 0
  },

  matches: {
    type: Number,
    default: 0
  },

  /*
  =====================================
  RP SYSTEM
  =====================================
  */

  weeklyRp: {
    type: Number,
    default: 0
  },

  seasonRp: {
    type: Number,
    default: 0
  },

  weeklyWins: {
    type: Number,
    default: 0
  },

  seasonWins: {
    type: Number,
    default: 0
  },

  rank: {
    type: String,
    default: "Rookie"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastActive: {
    type: Date,
    default: Date.now
  }

});

/*
=====================================
LEADERBOARD INDEXES
=====================================
*/

userSchema.index({
  weeklyRp: -1
});

userSchema.index({
  seasonRp: -1
});

module.exports =
  mongoose.model(
    "User",
    userSchema
  );

module.exports =
  mongoose.model(
    "User",
    userSchema
  );
