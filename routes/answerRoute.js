const express = require("express");
const router = express.Router();

// Import the destructured Answer controls
const { post } = require("../controller/answerController.js");

// post an answer to a answer
router.post("/post", post);

module.exports = router;
