require("dotenv").config();

class SMSModel {
  static async sendSMS(number, message) {
    try {
      const response = await fetch(
        "https://dashboard.philsms.com/api/v3/sms/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PHILSMS_TOKEN}`,
          },
          body: JSON.stringify({
            sender_id: "PhilSMS",
            recipient: number,
            message: message,
          }),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("PhilSMS Error:", error);
      throw error;
    }
  }
}

module.exports = SMSModel;
