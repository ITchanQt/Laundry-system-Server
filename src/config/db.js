const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+08:00",
  
  // Connection pool settings - OPTIMIZED
  connectionLimit: 15, // Increased slightly but still conservative
  waitForConnections: true,
  queueLimit: 50, // Limit queued requests to prevent memory issues
  
  // Connection lifecycle
  idleTimeout: 20000, // Release idle connections faster (20s instead of 30s)
  maxIdle: 5, // Keep max 5 idle connections
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 10000,
  
  // Query timeout
  connectTimeout: 10000, // 10s connection timeout
  acquireTimeout: 10000, // 10s to acquire connection from pool
  timeout: 30000, // 30s query timeout
  
  // Additional settings for stability
  multipleStatements: false, // Security: prevent SQL injection via multiple statements
  dateStrings: true, // Prevent date parsing issues
});

// Enhanced connection testing with retry logic
const testConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log("✓ Connected to Database");
      connection.release();
      return;
    } catch (err) {
      console.error(`✗ Error connecting to database (attempt ${i + 1}/${retries}):`, err.message);
      if (i === retries - 1) {
        console.error("Failed to connect after all retries");
        throw err;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Set timezone on new connections
pool.on("connection", function (connection) {
  connection.query("SET time_zone = '+08:00'");
});

// Enhanced error handling
pool.on("error", (err) => {
  console.error("Pool error:", err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.');
  }
});

// Monitor pool status (useful for debugging)
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database pool...');
  await pool.end();
  console.log('Database pool closed');
  process.exit(0);
});

testConnection();

module.exports = pool;