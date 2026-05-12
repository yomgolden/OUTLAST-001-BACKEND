const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const top = await User.find()
      .sort({ wins: -1, xp: -1 })
      .limit(20)
      .select("username wins xp level");
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
