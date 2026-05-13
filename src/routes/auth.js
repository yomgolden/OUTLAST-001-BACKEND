const router = require("express").Router();

const User = require("../models/User");

router.post("/telegram", async (req, res) => {

  try {

    const {
      id,
      username,
      first_name,
      photo_url
    } = req.body;

    /*
    =====================================
    VALIDATION
    =====================================
    */

    if (!id) {

      return res.status(400).json({
        error: "Telegram ID required"
      });
    }

    /*
    =====================================
    FORMAT DATA
    =====================================
    */

    const telegramId =
      String(id);

    const displayName =
      username ||
      first_name ||
      "Survivor";

    /*
    =====================================
    FIND USER
    =====================================
    */

    let user =
      await User.findOne({
        telegramId
      });

    /*
    =====================================
    CREATE NEW USER
    =====================================
    */

    if (!user) {

      user =
        await User.create({

          telegramId,

          username:
            displayName,

          firstName:
            first_name || "",

          photoUrl:
            photo_url || "",

          gold: 1000,

          gems: 0,

          xp: 0,

          level: 1,

          wins: 0,

          matches: 0,

          lastActive:
            new Date()
        });

      console.log(
        "NEW USER CREATED:",
        telegramId
      );
    }

    /*
    =====================================
    UPDATE EXISTING USER
    =====================================
    */

    else {

      // Keep latest Telegram info synced
      user.username =
        displayName;

      user.firstName =
        first_name || user.firstName;

      user.photoUrl =
        photo_url || user.photoUrl;

      user.lastActive =
        new Date();

      await user.save();

      console.log(
        "USER LOGIN:",
        telegramId
      );
    }

    /*
    =====================================
    RESPONSE
    =====================================
    */

    res.json({

      _id:
        user._id,

      telegramId:
        user.telegramId,

      username:
        user.username,

      firstName:
        user.firstName,

      photoUrl:
        user.photoUrl,

      gold:
        user.gold,

      gems:
        user.gems,

      level:
        user.level,

      xp:
        user.xp,

      wins:
        user.wins,

      matches:
        user.matches
    });

  } catch (err) {

    console.error(
      "AUTH ERROR:",
      err
    );

    res.status(500).json({
      error:
        err.message
    });
  }
});

module.exports = router;
