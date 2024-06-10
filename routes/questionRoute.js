const express = require("express");
const router = express.Router();

// Import the destructured Question controls
const { create, list, get } = require("../controller/questionController.js");

// list all questions
router.get("/list", list);

// register the user
router.post("/create", create);

// Get the question
router.get("/get", get);

module.exports = router;
