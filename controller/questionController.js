// db connection
const dbConnection = require("../db/dbConfig.js");

// Status codes like 200, 301, 400 and 500
const { StatusCodes } = require("http-status-codes");

// UUID package for random question id generation
const { v4: uuidv4 } = require("uuid");

async function create(req, res) {
  const { userid, title, description } = req.body;
  if (!userid || !title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }
  try {
    // set the UUID here
    const questionid = uuidv4();
    const tag = "evangadi";

    // Add Question
    const [result] = await dbConnection.query(
      "INSERT INTO questions( questionid, userid, title, description, tag) VALUES (?,?,?,?,?)",
      [questionid, userid, title, description, tag]
    );
    console.log("result", result);
    const [questionCreated] = await dbConnection.query(
      "select questionid, userid, title, description, tag from questions where id = ?   ",
      [result.insertId]
    );
    console.log("questionCreated", questionCreated);
    res.status(StatusCodes.CREATED).json({
      msg: "question created",
      questionid: questionCreated[0].questionid,
      username: questionCreated[0].username,
      title: questionCreated[0].title,
      description: questionCreated[0].description,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
  }
}

async function list(req, res) {
  try {
    const [questions] = await dbConnection.query("select * from questions");
    res.status(StatusCodes.OK).json({
      msg: "questions returned",
      questions,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
  }
}

async function get(req, res) {
  const { questionid } = req.body;
  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }
  try {
    console.log("questionid", questionid);

    // get the Specific Question
    const [questionAnswers] = await dbConnection.query(
      `SELECT
        a.answerid,
        a.questionid,
        a.userid,
        a.answer,
        u.username,
        u.firstname,
        u.lastname,
        u.email
      FROM
        answers a
      JOIN
        users u ON a.userid = u.userid
      WHERE
        a.questionid = ?`,
      [questionid]
    );

    console.log("questionAnswers", questionAnswers);
    res.status(StatusCodes.CREATED).json({
      msg: "All Question Answers returned.",
      questionAnswers,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
  }
}
module.exports = { create, list, get };
