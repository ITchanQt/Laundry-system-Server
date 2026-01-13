const BaseModel = require("../BaseModel");

class ForgotAndResetPassword extends BaseModel {
  static async findByEmailAndAdminRole(email) {
    try {
      const sql = "SELECT * FROM users WHERE role = 'ADMIN' AND email = ?";
      const results = await this.query(sql, [email]);
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmailAndStaffRole(email) {
    try {
      const sql = "SELECT * FROM users WHERE role = 'STAFF' AND email = ?";
      const results = await this.query(sql, [email]);
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmailAndCustomerRole(email) {
    try {
      const sql = "SELECT * FROM users WHERE role = 'CUSTOMER' AND email = ?";
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

  static async findByUserId(userId) {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const results = await this.query(sql, [userId]);
    return results[0];
  }

  static async updatePassword(admin_id, password) {
    try {
      const user = await this.findByUserId(admin_id);
      if (!user) {
        throw new Error("Admin not found");
      }

      const sql = `
      UPDATE users 
      SET password = ?, reset_token = NULL, reset_token_expires = NULL 
      WHERE email = ?
    `;

      const result = await this.query(sql, [password, user.email]);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update password");
      }

      return result;
    } catch (error) {
      console.error("Update password error:", error);
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }
}

module.exports = ForgotAndResetPassword;
