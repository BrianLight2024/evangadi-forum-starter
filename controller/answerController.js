// db connection
const dbConnection = require("../db/dbConfig.js");

// Status codes like 200, 301, 400 and 500
const { StatusCodes } = require("http-status-codes");

async function post(req, res) {
  const { userid, questionid, answer } = req.body;

  if (!userid || !questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    // Add Answer using PostgreSQL syntax
    const insertQuery = `
      INSERT INTO answers (userid, questionid, answer)
      VALUES ($1, $2, $3)
      RETURNING userid, questionid, answer;
    `;

    const values = [userid, questionid, answer];

    const {
      rows: [answerPosted],
    } = await dbConnection.query(insertQuery, values);

    res.status(StatusCodes.CREATED).json({
      msg: "Answer posted.",
      answerPosted,
    });
  } catch (error) {
    console.error("Error posting answer:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error, something went wrong, try again later!" });
  }
}

module.exports = { post };
