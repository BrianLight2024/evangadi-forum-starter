// db connection
const dbConnection = require("../db/dbConfig.js");

// Encryption package
const bcrypt = require("bcrypt");

// Status codes like 200, 301, 400 and 500
const { StatusCodes } = require("http-status-codes");

// JWT package
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    // Check if User is already registered
    const userQuery =
      "SELECT username, userid FROM users WHERE username = $1 OR email = $2";
    const { rows: user } = await dbConnection.query(userQuery, [
      username,
      email,
    ]);
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }

    // Check if password is strong
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register User
    const insertQuery = `
      INSERT INTO users (username, firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING userid`;
    const { rows: result } = await dbConnection.query(insertQuery, [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    const userId = result[0].userid;

    const userCreatedQuery =
      "SELECT username, firstname, userid FROM users WHERE userid = $1";
    const { rows: userCreated } = await dbConnection.query(userCreatedQuery, [
      userId,
    ]);

    res.status(StatusCodes.CREATED).json({
      msg: "User created",
      username: userCreated[0].username,
      userid: userCreated[0].userid,
      firstname: userCreated[0].firstname,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal error, something went wrong, try again later!",
      err: error,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  try {
    // Check if User email is found
    const userQuery =
      "SELECT username, firstname, userid, password FROM users WHERE email = $1";
    const { rows: user } = await dbConnection.query(userQuery, [email]);

    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Credential" });
    }

    // Compare the password
    const isPasswordMatching = await bcrypt.compare(password, user[0].password);

    // If password not matching
    if (!isPasswordMatching) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Credential" });
    }

    // On success sign the JWT
    const { username, userid, firstname } = user[0];
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({
      msg: "User login successful",
      userid,
      username,
      firstname,
      token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal error, something went wrong, try again later!",
      err: error,
    });
  }
}

async function check(req, res) {
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, check };
