const pool = require('../config/db');

class BaseModel {
    static async query(sql, params) {
        try {
            const [results] = await pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}

module.exports = BaseModel;