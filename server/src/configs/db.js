const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "soytk",
  database: "card_image",
});

module.exports = db;
