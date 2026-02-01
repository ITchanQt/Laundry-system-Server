const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendResetEmail(toEmail, resetUrl) {
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f7f9; padding: 40px 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" 
      style="max-width: 580px; background: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333; margin-bottom: 10px; font-size: 24px;">Reset Your Password</h2>
          <p style="color: #555; font-size: 15px; margin-bottom: 25px;">
            We received a request to reset your password for your account.
          </p>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <a href="${resetUrl}"
            style="
              background-color: #4a90e2;
              padding: 14px 28px;
              color: white;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
              display: inline-block;
            ">
            Reset Password
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding-top: 20px; color: #555; font-size: 14px;">
          <p>
            This link will expire in <strong>5 minutes</strong> for security purposes.
          </p>
          <p>
            If you didn’t request this, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="border-top: 1px solid #eee; padding-top: 25px; font-size: 13px; color: #888;">
          <p style="margin-bottom: 8px;">Thank you,</p>
          <p style="font-weight: bold; color: #555;">Wise Wash Inteligence Laundry Management System Team</p>
        </td>
      </tr>

    </table>

    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
      If the button doesn’t work, paste this link into your browser:<br>
      <a href="${resetUrl}" style="color: #4a90e2;">${resetUrl}</a>
    </p>
  </div>
  `;

  return transporter.sendMail({
    from: `"Wise Wash Inteligence Laundry Management System" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your Password",
    html,
  });
}

const OTPtransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOtpEmail(toEmail, otpCode) {
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f7f9; padding: 40px 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="
        max-width: 580px;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      "
    >
      
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333; margin-bottom: 10px; font-size: 24px;">
            Email Verification Code
          </h2>
          <p style="color: #555; font-size: 15px; margin-bottom: 25px;">
            Use the 6-digit verification code below to complete your registration.
          </p>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding: 20px;">
          <div
            style="
              font-size: 38px;
              letter-spacing: 12px;
              font-weight: bold;
              color: #4a90e2;
              padding: 14px 0;
              border-radius: 8px;
              background: #f0f6ff;
              display: inline-block;
              width: 80%;
            "
          >
            ${otpCode}
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding-top: 20px; color: #555; font-size: 14px; text-align: center;">
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
          <p>If you didn’t request this code, please ignore this email.</p>
        </td>
      </tr>

      <tr>
        <td style="border-top: 1px solid #eee; padding-top: 25px; font-size: 13px; color: #888;">
          <p style="margin-bottom: 8px;">Thank you,</p>
          <p style="font-weight: bold; color: #555;">Wise Wash Inteligence Laundry Management System Team</p>
        </td>
      </tr>

    </table>

    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
      If you have trouble reading the code, simply reply to this email for assistance.
    </p>
  </div>
  `;

  await OTPtransporter.sendMail({
    from: `"Wise Wash Inteligence Laundry Management System" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html,
  });
}

async function sendShopLinksEmail(toEmail, shopName, links) {
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f7f9; padding: 40px 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" 
      style="max-width: 600px; background: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333; margin-bottom: 10px; font-size: 24px;">Welcome to Wise Wash!</h2>
          <p style="color: #555; font-size: 15px; margin-bottom: 30px;">
            Your laundry shop <strong>${shopName}</strong> is now ready. Use the buttons below to log in, or <strong>copy the URLs</strong> for your records.
          </p>
        </td>
      </tr>

      ${[
        { label: "📊 ADMIN MODULE", link: links.admin, color: "#4a90e2" },
        { label: "👥 STAFF MODULE", link: links.staff, color: "#50c878" },
        { label: "🛍️ CUSTOMER MODULE", link: links.customer, color: "#ff6b6b" },
      ]
        .map(
          (mod) => `
        <tr>
          <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
            <p style="color: #333; font-size: 14px; font-weight: bold; margin: 0 0 10px 0;">${mod.label}</p>
            <a href="${mod.link}" style="background-color: ${mod.color}; padding: 10px 18px; color: white; text-decoration: none; font-size: 13px; border-radius: 6px; display: inline-block; font-weight: bold;">
              Open Module
            </a>
            <div style="margin-top: 10px; padding: 8px; background-color: #f9f9f9; border: 1px dashed #ccc; color: #666; font-family: monospace; font-size: 11px; word-break: break-all;">
              ${mod.link}
            </div>
            <p style="color: #999; font-size: 10px; margin-top: 4px;">↑ Highligh and copy the URL above</p>
          </td>
        </tr>
      `,
        )
        .join("")}

      <tr>
        <td style="padding-top: 25px; font-size: 13px; color: #888;">
          <p style="margin-bottom: 8px;">Thank you,</p>
          <p style="font-weight: bold; color: #555;">Wise Wash Intelligence Team</p>
        </td>
      </tr>
    </table>
  </div>
  `;

  return transporter.sendMail({
    from: `"Wise Wash Intelligence" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Your ${shopName} Shop Links`,
    html,
  });
}

module.exports = { sendResetEmail, sendOtpEmail, sendShopLinksEmail };
