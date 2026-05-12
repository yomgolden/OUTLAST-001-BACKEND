const router = require("express").Router();
const User = require("../models/User");

router.post("/telegram", async (req, res) => {
  try {
    const { id, username, first_name } = req.body;
    if (!id) return res.status(400).json({ error: "ID required" });

    const telegramId = String(id);
    const name = username || first_name || "Survivor";

    let user = await User.findOne({ telegramId });
    if (!user) {
      user = await User.create({ telegramId, username: name });
    }

    user.lastActive = new Date();
    await user.save();

    res.json({
      _id: user._id,
      telegramId: user.telegramId,
      username: user.username,
      gold: user.gold,
      gems: user.gems,
      level: user.level,
      xp: user.xp,
      wins: user.wins,
      matches: user.matches
    });
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
