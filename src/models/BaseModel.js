const pool = require("../config/db");

class BaseModel {
  /**
   * Execute a query with proper connection management
   * @param {string} sql - SQL query string
   * @param {Array} params - Query parameters
   * @param {Object} options - Additional options (timeout, etc.)
   * @returns {Promise<Array>} Query results
   */
  static async query(sql, params = [], options = {}) {
    const startTime = Date.now();
    let connection;
    
    try {
      // Get connection from pool with timeout
      connection = await pool.getConnection();
      
      // Set query timeout (default 10s, can be overridden)
      const timeout = options.timeout || 10000;
      
      const [results] = await connection.query(
        {
          sql,
          timeout,
        },
        params
      );
      
      const executionTime = Date.now() - startTime;
      
      // Log slow queries (> 3s)
      if (executionTime > 3000) {
        console.warn('Slow query detected:', {
          sql: sql.substring(0, 100) + '...',
          executionTime: `${executionTime}ms`,
          params: params.length
        });
      }
      
      return results || [];
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      console.error("Database query error:", {
        sql: sql.substring(0, 200) + '...',
        params: params.slice(0, 5), // Only log first 5 params to avoid logging sensitive data
        error: error.message,
        code: error.code,
        executionTime: `${executionTime}ms`
      });
      
      // Re-throw with more context
      const enhancedError = new Error(`DB Query Failed: ${error.message}`);
      enhancedError.originalError = error;
      enhancedError.code = error.code;
      throw enhancedError;
      
    } finally {
      // CRITICAL: Always release connection back to pool
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Execute multiple queries in a transaction
   * @param {Function} callback - Async function that receives connection
   * @returns {Promise<any>} Result from callback
   */
  static async transaction(callback) {
    let connection;
    
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
      
      const result = await callback(connection);
      
      await connection.commit();
      return result;
      
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      
      console.error("Transaction error:", {
        error: error.message,
        code: error.code
      });
      
      throw error;
      
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  /**
   * Get pool status for monitoring
   * @returns {Object} Pool statistics
   */
  static getPoolStatus() {
    return {
      totalConnections: pool.pool._allConnections.length,
      freeConnections: pool.pool._freeConnections.length,
      queuedRequests: pool.pool._connectionQueue.length,
    };
  }
}

module.exports = BaseModel;