const pool = require("../config/db");

class BaseModel {
  static async query(sql, params = []) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [results] = await connection.query(
        {
          sql,
          timeout: 10000,
        },
        params
      );
      return results || [];
    } catch (error) {
      console.error("Database query error:", {
        sql,
        params,
        error: error.message,
      });
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

module.exports = BaseModel;
