const express = require("express");
const router = express.Router();

//Authentication Middleware
const authMiddleWare = require("../middleware/authMiddleware.js");

// Import the destructured User controls
const { register, login, check } = require("../controller/userController.js");
// register the user
router.post("/register", register);

router.post("/login", login);

// Get the user
router.get("/check", authMiddleWare, check);

module.exports = router;
