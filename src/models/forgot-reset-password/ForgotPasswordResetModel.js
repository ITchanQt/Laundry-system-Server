const BaseModel = require("../BaseModel");

class ForgotAndResetPassword extends BaseModel {
  static async findByEmail(email) {
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const results = await this.query(sql, [email]);
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async saveResetToken(hashedToken, expiresAt, admin_id) {
    try {
      const sql =
        "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE user_id = ?";
      const result = await this.query(sql, [hashedToken, expiresAt, admin_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByResetToken(hashedToken) {
    const sql =
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()";
    const result = await this.query(sql, [hashedToken]);
    return result[0];
  }

  static async updatePassword(admin_id, password) {
    const sql = `
    UPDATE users 
    SET password = ?, reset_token = NULL, reset_token_expires = NULL 
    WHERE user_id = ?
  `;
    const result = await this.query(sql, [password, admin_id]);
    return result;
  }
}

module.exports = ForgotAndResetPassword;
