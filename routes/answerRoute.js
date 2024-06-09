const express = require("express");
const router = express.Router();

router.get("/all-answers", (req, res) => {
  res.send("Answer showing");
});

module.exports = router;
