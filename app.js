const express = require("express");

const app = express();
const port = 5500;

// Any request passes through this middleware  to extract json data
app.use(express.json());

// Auth Middleware
const authMiddleWare = require("./middleware/authMiddleware");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// Question routes
const questionRoutes = require("./routes/questionRoute");

// Answer routes
const answerRoutes = require("./routes/answerRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// Question routes
app.use("/api/questions", authMiddleWare, questionRoutes);

// Answer routes
app.use("/api/answers", authMiddleWare, answerRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Project running on port: ${port}`);
  }
});
