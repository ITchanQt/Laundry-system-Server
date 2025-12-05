const db = require("../config/db");

class OtpModel {
  static async saveOtp(email, otp) {
    const sql = `
      INSERT INTO email_otps (email, otp_code, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
    `;

    return db.query(sql, [email, otp]);
  }

  static async verifyOtp(email, otp) {
    const sql = `
      SELECT * FROM email_otps
      WHERE email = ?
        AND otp_code = ?
        AND expires_at > NOW()
      ORDER BY id DESC
      LIMIT 1
    `;

    const result = await db.query(sql, [email, otp]);
    return result[0];
  }
}

module.exports = OtpModel;
