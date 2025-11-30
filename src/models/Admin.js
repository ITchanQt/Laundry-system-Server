const BaseModel = require("./BaseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Admin extends BaseModel {
  static async findByUsername(username) {
    const sql = "SELECT * FROM admins WHERE admin_username = ?";
    const results = await this.query(sql, [username]);
    return results[0];
  }

  static async generateAdminId() {
    try {
      // Get the highest admin ID
      const sql = "SELECT admin_id FROM admins ORDER BY admin_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].admin_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSA-00001
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
        role = "Admin", // Default value
        status = "Active", // Default value
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

      const sql = `
            INSERT INTO admins (
                admin_id,
                admin_fName, 
                admin_mName, 
                admin_lName, 
                admin_address, 
                admin_username, 
                admin_contactNum, 
                email,
                role,
                status, 
                password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const params = [
        admin_id,
        admin_fName,
        admin_mName,
        admin_lName,
        admin_address || null, // Convert empty string to null
        admin_username,
        admin_contactNum,
        email,
        role,
        status,
        hashedPassword,
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
      "SELECT * FROM admins WHERE shop_id = ? AND (email = ? OR admin_username = ?)";
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
       console.log('Password match:', match ? 'Yes' : 'No');
       
      if (!match) {
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign(
        {
          id: admin.admin_id,
          username: admin.admin_username,
          role: "admin",
          shop_id: admin.shop_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // <- THIS controls expiration
      );

      return {
        token,
        admin: {
          id: admin.admin_id,
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

  static async findByEmail(admin_email) {
    try {
      const sql = "SELECT * FROM admins WHERE email = ?";
      const results = await this.query(sql, [admin_email]);
      return results[0];
    } catch (error) {
      throw new Error(`Failed to find admin by email: ${error.message}`);
    }
  }

  static async searchByEmail(partialEmail) {
    try {
      const sql =
        "SELECT admin_id, email, admin_fName, admin_mName, admin_lName, admin_address, admin_contactNum FROM admins WHERE email LIKE ?";
      const results = await this.query(sql, [`%${partialEmail}%`]);
      return results;
    } catch (error) {
      throw new Error(`Failed to search admins by email: ${error.message}`);
    }
  }
}

module.exports = Admin;
