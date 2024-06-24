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
    const questionid = uuidv4();
    const tag = "evangadi";
    const createdAt = new Date(); // Current timestamp

    // Add Question using PostgreSQL syntax
    const insertQuery = `
      INSERT INTO questions (questionid, userid, title, description, tag, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING questionid, userid, title, description, tag, created_at;
    `;

    const values = [questionid, userid, title, description, tag, createdAt];

    const {
      rows: [questionCreated],
    } = await dbConnection.query(insertQuery, values);

    res.status(StatusCodes.CREATED).json({
      msg: "Question created",
      questionid: questionCreated.questionid,
      userid: questionCreated.userid,
      title: questionCreated.title,
      description: questionCreated.description,
      created_at: questionCreated.created_at,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error, something went wrong, try again later!" });
  }
}

async function list(req, res) {
  try {
    const query = `
      SELECT
        q.questionid,
        q.userid,
        q.title,
        q.description,
        q.tag,
        u.username,
        q.created_at
      FROM
        questions q
      JOIN
        users u ON q.userid = u.userid
      ORDER BY
        q.created_at DESC;
    `;

    const { rows: questions } = await dbConnection.query(query);

    res.status(StatusCodes.OK).json({
      msg: "Questions returned",
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error, something went wrong, try again later!" });
  }
}

async function get(req, res) {
  const { questionid } = req.query;

  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const query = `
      SELECT
        a.answerid,
        a.questionid,
        a.userid,
        a.answer,
        u.username,
        u.firstname,
        u.lastname,
        u.email,
        q.title AS question_title,
        q.description AS question_description
      FROM
        answers a
      JOIN
        users u ON a.userid = u.userid
      JOIN
        questions q ON a.questionid = q.questionid
      WHERE
        a.questionid = $1;
    `;

    const { rows: questionAnswers } = await dbConnection.query(query, [
      questionid,
    ]);

    res.status(StatusCodes.OK).json({
      msg: "All Question Answers returned.",
      questionAnswers,
    });
  } catch (error) {
    console.error("Error fetching question answers:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error, something went wrong, try again later!" });
  }
}
module.exports = { create, list, get };
