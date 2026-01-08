const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+08:00",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✓ Connected to Database");
    connection.release();
  } catch (err) {
    console.error("✗ Error connecting to the database:", err);
    throw err;
  }
};

pool.on("connection", function (connection) {
  connection.query("SET time_zone = '+08:00'");
});

pool.on("error", (err) => {
  console.error("Pool error:", err);
});

testConnection();

module.exports = pool;
