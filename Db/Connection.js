const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.HOST, // Host Name
  user: process.env.USER, // Database Username
  password: process.env.PASSWORD, // Database Password
  database: process.env.DATABASE,
});

module.exports = connection;
