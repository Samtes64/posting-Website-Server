const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
 
router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  try {
    const foundLike = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });

    if (!foundLike) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({liked:true});
    } else {
      await foundLike.destroy();
      res.json({liked:false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
