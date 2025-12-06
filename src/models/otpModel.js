const BaseModel = require("./BaseModel");

class OtpModel extends BaseModel {
  // Delete previous OTPs and save a new one
  static async saveOtp(email, otp) {
    await this.query("DELETE FROM email_otps WHERE email = ?", [email]);

    const sql = `
      INSERT INTO email_otps (email, otp_code, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
    `;
    return this.query(sql, [email, otp]);
  }

  // Check OTP validity
  static async verifyOtp(email, otp) {
    const sql = `
      SELECT * FROM email_otps
      WHERE email = ?
        AND otp_code = ?
        AND expires_at > NOW()
        AND is_verified = 0
      ORDER BY id DESC
      LIMIT 1
    `;
    const result = await this.query(sql, [email, otp]);
    return result[0];
  }

  // Mark OTP as used
  static async markOtpUsed(id) {
    return this.query("UPDATE email_otps SET is_verified = 1 WHERE id = ?", [id]);
  }

  // Check if email is verified before registration
  static async isEmailVerified(email) {
    const sql = `
      SELECT * FROM email_otps
      WHERE email = ?
        AND is_verified = 1
      ORDER BY id DESC
      LIMIT 1
    `;
    const result = await this.query(sql, [email]);
    return result[0];
  }
}

module.exports = OtpModel;
