const BaseModel = require("./BaseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Admin extends BaseModel {
  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const results = await this.query(sql, [username]);
    return results[0];
  }

  static async findByPhoneNum(contactNum) {
    const sql = "SELECT * FROM users WHERE contactNum = ?";
    const results = await this.query(sql, [contactNum]);
    return results[0];
  }

  static async findByEmail(admin_email) {
    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      const results = await this.query(sql, [admin_email]);
      return results[0];
    } catch (error) {
      throw new Error(`Failed to find admin by email: ${error.message}`);
    }
  }

  static async generateAdminId() {
    try {
      // Get the highest admin ID
      const sql = ` SELECT user_id 
                    FROM users 
                    ORDER BY CAST(SUBSTRING(user_id, 6) AS UNSIGNED) DESC 
                    LIMIT 1`;

      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].user_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSU-00001
      return `LMSA-${String(nextNumber).padStart(5, "0")}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async createAdmin(adminData) {
    try {
      const admin_id = await this.generateAdminId();

      // Set default values and validate required fields
      const {
        admin_fName,
        admin_mName = null, // Optional field
        admin_lName,
        admin_address,
        admin_username,
        admin_contactNum,
        email,
        role = "ADMIN", // Default value
        status = "ACTIVE", // Default value
        registered_by = "S-ADMIN",
        password,
      } = adminData;

      // Validate required fields
      if (
        !admin_fName ||
        !admin_lName ||
        !admin_username ||
        !admin_contactNum ||
        !email ||
        !password
      ) {
        throw new Error("Missing required fields");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO users 
                  (user_id, 
                  username, 
                  email, 
                  password, 
                  user_fName, 
                  user_mName, 
                  user_lName, 
                  user_address,
                  contactNum, 
                  role, 
                  status, 
                  registered_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const params = [
        admin_id,
        admin_username,
        email,
        hashedPassword,
        admin_fName,
        admin_mName,
        admin_lName,
        admin_address || null,
        admin_contactNum,
        role,
        status,
        registered_by,
      ];

      // Debug log
      console.log(
        "Creating admin with params:",
        params.map((p) => (p === null ? "NULL" : p))
      );

      return await this.query(sql, params);
    } catch (error) {
      throw new Error(`Failed to create admin: ${error.message}`);
    }
  }

  static async findByEmailOrUsername(shop_id, emailOrUsername) {
    const sql =
      "SELECT * FROM users WHERE role = 'ADMIN' AND shop_id = ? AND (email = ? OR username = ?)";
    const results = await this.query(sql, [
      shop_id,
      emailOrUsername,
      emailOrUsername,
    ]);
    return results[0];
  }

  static async login(shop_id, emailOrUsername, password) {
    try {
      console.log("Login attempt with:", { emailOrUsername, password });

      if (!shop_id) {
        return {
          error: "Invalid shop. Please login from the correct shop URL.",
        };
      }

      const admin = await this.findByEmailOrUsername(shop_id, emailOrUsername);
      console.log("Found admin:", admin ? "Yes" : "No");

      if (!admin) {
        return { error: "Invalid credentials" };
      }

      const match = await bcrypt.compare(password, admin.password);
      console.log("Password match:", match ? "Yes" : "No");

      if (!match) {
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign(
        {
          id: admin.user_id,
          username: admin.username,
          role: "admin",
          shop_id: admin.shop_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // <- THIS controls expiration
      );

      return {
        token,
        admin: {
          id: admin.user_id,
          username: admin.admin_username,
          email: admin.email,
          shop_id: admin.shop_id,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async getAllAdmins() {
    try {
      const sql =
        "SELECT admin_id, admin_fName, admin_mName, admin_lName, admin_address, admin_username, admin_contactNum, email, date_registered, role, status FROM admins";
      const results = await this.query(sql);
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch admins: ${error.message}`);
    }
  }

  static async searchByEmail(partialEmail) {
    try {
      const sql =
        "SELECT user_id, email, user_fName, user_mName, user_lName, user_address, contactNum FROM users WHERE role = 'ADMIN' AND email LIKE ?";
      const results = await this.query(sql, [`%${partialEmail}%`]);
      return results;
    } catch (error) {
      throw new Error(`Failed to search admins by email: ${error.message}`);
    }
  }

  static async selectDashboardStats(shop_id, targetDate) {
    try {
      const sql = `
      SELECT 
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS total_count_today,
        COALESCE(SUM(CASE WHEN DATE(created_at) = CURDATE() THEN total_amount ELSE 0 END), 0) AS total_revenue_today,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) THEN num_items ELSE 0 END), 0) AS active_garments,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) THEN total_amount ELSE 0 END), 0) AS active_garment_value,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) THEN 1 ELSE 0 END), 0) AS active_orders_count,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) THEN total_amount ELSE 0 END), 0) AS active_orders_value,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) AND status = 'On Service' THEN 1 ELSE 0 END), 0) AS count_on_service,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) AND status = 'Ready to pick up' THEN 1 ELSE 0 END), 0) AS count_ready,
        COALESCE(SUM(CASE WHEN DATE(created_at) = DATE(?) AND status = 'Laundry Done' THEN 1 ELSE 0 END), 0) AS count_done
      FROM customer_transactions
      WHERE shop_id = ?
    `;

      const params = Array(7).fill(targetDate).concat([shop_id]);
      const results = await this.query(sql, params);

      return results[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw error;
    }
  }

  static async selectWeeklyTransactionCount(shop_id) {
    try {
      const sql = `
      SELECT 
        DATE_FORMAT(created_at, '%a') AS day, 
        COUNT(*) AS value
      FROM customer_transactions
      WHERE shop_id = ? 
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY day, DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `;
      return await this.query(sql, [shop_id]);
    } catch (error) {
      console.error("Model Error:", error);
      throw error;
    }
  }
}

module.exports = Admin;
