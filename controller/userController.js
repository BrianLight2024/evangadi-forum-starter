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
    const [user] = await dbConnection.query(
      "select username, userid from users where username = ? or email = ? ",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already existed" });
    }
    // Check if password is strong
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be atleast 8 characters" });
    }
    // Encrypt password before storing
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Register User
    const [result] = await dbConnection.query(
      "INSERT INTO users( username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    const [userCreated] = await dbConnection.query(
      "select  username , firstname, userid from users where userid = ?   ",
      [result.insertId]
    );
    res.status(StatusCodes.CREATED).json({
      msg: "user created",
      username: userCreated[0].username,
      userid: userCreated[0].userid,
      firstname: userCreated[0].firstname,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
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
    const [user] = await dbConnection.query(
      "select  username , firstname, userid , password  from users where  email = ? ",
      [email]
    );

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
      msg: "user login successful",
      userid,
      username,
      firstname,
      token,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Error , something went wrong, try again later!" });
  }
}

async function check(req, res) {
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, check };
