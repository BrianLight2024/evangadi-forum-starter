const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: "evangadi-admin",
  database: "evangadi-db",
  host: "localhost",
  password: "123456789",
  connectionLimit: 10,
});

// Async call
module.exports = dbConnection.promise();
