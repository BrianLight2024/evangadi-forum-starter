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
    // Add Question
    const [result] = await dbConnection.query(
      "INSERT INTO answers( userid, questionid, answer) VALUES (?,?,?)",
      [userid, questionid, answer]
    );
    console.log("result", result);

    const [answerPosted] = await dbConnection.query(
      "select   userid, questionid, answer from answers where answerid = ?   ",
      [result.insertId]
    );
    console.log("answerPosted", answerPosted);
    res.status(StatusCodes.CREATED).json({
      msg: "Answer posted.",
      answerPosted,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
  }
}

module.exports = { post };
