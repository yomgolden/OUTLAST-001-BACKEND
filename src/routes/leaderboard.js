const router =
  require("express").Router();

const User =
  require("../models/User");

/*
=====================================
WEEKLY LEADERBOARD
=====================================
*/

router.get(
  "/weekly",
  async (req, res) => {

    try {

      const top =
        await User.find()

          .sort({
            weeklyRp: -1
          })

          .limit(50)

          .select(
            "username weeklyRp rank"
          );

      res.json(top);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);

/*
=====================================
SEASONAL LEADERBOARD
=====================================
*/

router.get(
  "/seasonal",
  async (req, res) => {

    try {

      const top =
        await User.find()

          .sort({
            seasonRp: -1
          })

          .limit(50)

          .select(
            "username seasonRp rank"
          );

      res.json(top);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;
