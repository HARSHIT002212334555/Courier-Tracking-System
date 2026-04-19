const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MYsql@123", // 👈 अपना password डालो
  database: "courier_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Database Connected ✅");
  }
});

module.exports = db;