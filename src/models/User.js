const BaseModel = require("./BaseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User extends BaseModel {
  static async findByUserId(userId) {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const results = await this.query(sql, [userId]);
    return results[0];
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const results = await this.query(sql, [email]);
    return results[0];
  }

  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const results = await this.query(sql, [username]);
    return results[0];
  }

  static async findByContactNum(shop_id, contactNum) {
    const sql = "SELECT * FROM users WHERE shop_id = ? AND contactNum = ?";
    const results = await this.query(sql, [shop_id, contactNum]);
    return results[0];
  }

  static async generateUserId() {
    try {
      // Get the highest admin ID
      const sql = "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].user_id;
        const lastNumber = parseInt(lastId.split("-")[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSU-00001
      return `LMSU-${String(nextNumber).padStart(5, "0")}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async create(userData) {
    try {
      // Generate user ID
      const user_id = await this.generateUserId();

      // Destructure with default values
      const {
        shop_id,
        username,
        email,
        password,
        user_fName,
        user_mName = "",
        user_lName,
        user_address = "",
        contactNum,
        role,
        status = "ACTIVE",
        registered_by = "ADMIN",
      } = userData;
      // Validate required fields
      if (
        !username ||
        !email ||
        !password ||
        !user_fName ||
        !user_lName ||
        !contactNum
      ) {
        throw new Error("Missing required fields");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO users 
            (user_id, shop_id, username, email, password, user_fName, user_mName, user_lName, 
             user_address, contactNum, role, status, registered_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        user_id,
        shop_id,
        username,
        email,
        hashedPassword,
        user_fName,
        user_mName,
        user_lName,
        user_address,
        contactNum,
        role,
        status,
        registered_by,
      ]);
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  static async createWalkInCustomer(cus_data) {
    try {
      const user_id = await this.generateUserId();

      const {
        shop_id,
        user_fName,
        user_lName,
        user_address = null,
        contactNum,
        role = "CUSTOMER",
        username = "WALK IN",
        email = "WALK@IN",
        status = "ACTIVE",
        registered_by,
      } = cus_data;

      const sql = `INSERT INTO users 
                    (
                    user_id, 
                    shop_id, 
                    user_fName, 
                    user_lName, 
                    user_address, 
                    contactNum, 
                    role, 
                    username, 
                    email, 
                    status, 
                    registered_by
                    )
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      await this.query(sql, [
        user_id,
        shop_id,
        user_fName,
        user_lName,
        user_address,
        contactNum,
        role,
        username,
        email,
        status,
        registered_by,
      ]);

      return {
        user_id,
        user_fName,
        user_lName,
        user_address,
        contactNum,
      };
    } catch (error) {
      throw new Error(`Failed to create walk in customer: ${error.message}`);
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async findByEmailOrUsername(shop_id, emailOrUsername) {
    const sql =
      "SELECT * FROM users WHERE role = 'CUSTOMER' AND shop_id = ? AND (email = ? OR username = ?)";
    const results = await this.query(sql, [
      shop_id,
      emailOrUsername,
      emailOrUsername,
    ]);
    return results[0];
  }

  static async isShopActive(shop_id) {
    const sql =
      "SELECT shop_status FROM laundry_shops WHERE shop_id = ? LIMIT 1";
    const results = await this.query(sql, [shop_id]);

    if (results.length === 0) return { exists: false, status: null };

    return {
      exists: true,
      status: results[0].shop_status,
    };
  }

  static async findByEmailOrUsernameCustomerRole(emailOrUsername) {
    const sql = `
      SELECT * FROM users 
      WHERE role = 'CUSTOMER' 
      AND (email = ? OR username = ?) 
      LIMIT 1
    `;
    const results = await this.query(sql, [emailOrUsername, emailOrUsername]);
    return results[0] || null;
  }

  static async loginCustomer(emailOrUsername, password) {
    try {
      // 1. Prevent "WALK IN" or empty logins
      if (
        emailOrUsername === "WALK IN" ||
        !password ||
        password.trim() === ""
      ) {
        return { error: "Invalid login attempt." };
      }

      // 2. Find the customer globally
      const user =
        await this.findByEmailOrUsernameCustomerRole(emailOrUsername);
      if (!user) {
        return { error: "Invalid credentials" };
      }

      const shopCheck = await this.isShopActive(user.shop_id);

      if (!shopCheck.exists) {
        return {
          error: "The shop associated with your account no longer exists.",
        };
      }

      if (shopCheck.status !== "Active") {
        const statusMsgs = {
          Pending: "This shop's registration is pending approval.",
          Inactive: "This shop's access has been deactivated.",
        };
        return { error: statusMsgs[shopCheck.status] || "Shop access denied." };
      }

      if (user.status === "PENDING") {
        return { error: "Your account is pending approval." };
      }

      if (user.status === "INACTIVE") {
        return { error: "Your account has been deactivated." };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) return { error: "Invalid credentials" };

      const token = jwt.sign(
        {
          id: user.user_id,
          user_lName: user.user_lName,
          user_fName: user.user_fName,
          role: user.role,
          shop_id: user.shop_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" },
      );

      return {
        token,
        user: {
          id: user.user_id,
          user_lName: user.user_lName,
          user_fName: user.user_fName,
          role: user.role,
          shop_id: user.shop_id,
        },
      };
    } catch (error) {
      console.error("User Login error:", error);
      throw error;
    }
  }

  static async findByEmailOrUsernameStaffRole(shop_id, emailOrUsername) {
    const sql =
      "SELECT * FROM users WHERE role = 'STAFF' AND shop_id = ? AND (email = ? OR username = ?)";
    const results = await this.query(sql, [
      shop_id,
      emailOrUsername,
      emailOrUsername,
    ]);
    return results[0];
  }

  static async findByEmailOrUsernameStaffGlobal(emailOrUsername) {
    const sql = `
    SELECT * FROM users 
    WHERE role = 'STAFF' 
    AND (email = ? OR username = ?) 
    LIMIT 1
  `;
    const results = await this.query(sql, [emailOrUsername, emailOrUsername]);
    return results[0] || null;
  }

  static async loginStaff(emailOrUsername, password) {
    try {
      const user = await this.findByEmailOrUsernameStaffGlobal(emailOrUsername);

      if (!user) {
        return { error: "Invalid credentials" };
      }

      const shopCheck = await this.isShopActive(user.shop_id);

      if (!shopCheck.exists) {
        return {
          error: "The shop associated with this account no longer exists.",
        };
      }

      if (shopCheck.status !== "Active") {
        const statusMsgs = {
          Pending: "This shop's registration is pending approval.",
          Inactive: "This shop's access has been deactivated.",
        };
        return { error: statusMsgs[shopCheck.status] || "Shop access denied." };
      }

      if (user.status === "PENDING") {
        return { error: "Your account is pending approval." };
      }

      if (user.status === "INACTIVE") {
        return { error: "Your account has been deactivated." };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { error: "Invalid credentials" };
      }

      const token = jwt.sign(
        {
          id: user.user_id,
          user_lName: user.user_lName,
          user_fName: user.user_fName,
          role: user.role,
          shop_id: user.shop_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" },
      );

      return {
        token,
        staff: {
          id: user.user_id,
          user_lName: user.user_lName,
          user_fName: user.user_fName,
          role: user.role,
          shop_id: user.shop_id,
        },
      };
    } catch (error) {
      console.error("Staff Login Error:", error);
      throw error;
    }
  }

  static async getAllUsers() {
    const query = "SELECT * FROM users ORDER BY date_registered DESC";
    const results = await this.query(query);
    return results;
  }

  static async findUsersByShopScope(shop_id) {
    const sql = `
                SELECT u.*
                FROM users u
                JOIN laundry_shops s ON s.shop_id = ?
                WHERE (
                    u.shop_id = s.shop_id
                    OR (u.shop_id = s.parent_shop_id AND u.role = 'ADMIN')
                )
                ORDER BY u.date_registered DESC
                `;

    const results = await this.query(sql, [shop_id]);
    return results;
  }

  static async editUserByID(userId, updateData) {
    try {
      if (!userId) {
        throw new Error("User ID is required for update");
      }

      const user = await this.findByUserId(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const updatedData = {
        user_fName: updateData.user_fName || user.user_fName,
        user_mName: updateData.user_mName,
        user_lName: updateData.user_lName || user.user_lName,
        username: updateData.username || user.username,
        email: updateData.email || user.email,
        user_address: updateData.user_address || user.user_address,
        contactNum: updateData.contactNum,
        role: updateData.role || user.role,
        status: updateData.status || user.status,
      };

      const query = `UPDATE users
                SET user_fName = ?,
                    user_mName = ?,
                    user_lName = ?,
                    username = ?,
                    email = ?,
                    user_address = ?,
                    contactNum = ?,
                    role = ?,
                    status = ?
                WHERE user_id = ?`;

      const result = await this.query(query, [
        updatedData.user_fName,
        updatedData.user_mName,
        updatedData.user_lName,
        updatedData.username,
        updatedData.email,
        updatedData.user_address,
        updatedData.contactNum,
        updatedData.role,
        updatedData.status,
        userId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update user");
      }

      return this.findByUserId(userId);
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  static async searchUserByIdOrNameWithCustomerRole(shop_id) {
    try {
      const sql = `SELECT * FROM users
                         WHERE role = 'CUSTOMER'
                         AND shop_id = ?`;
      const results = await this.query(sql, [shop_id]);
      return results;
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  }

  static async findUserByIdAndShopId(shop_id, user_id) {
    try {
      const sql = `SELECT * FROM users
                         WHERE role = 'CUSTOMER'
                         AND shop_id = ?
                         AND user_id = ?`;
      const results = await this.query(sql, [shop_id, user_id]);
      return results;
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  }

  // Staff fetching on staff module
  static async selectUserByIdShopIdRole(user_id, shop_id) {
    try {
      const sql =
        "SELECT * FROM users WHERE role = 'STAFF' AND user_id = ? AND shop_id = ?";
      const results = await this.query(sql, [user_id, shop_id]);
      return results[0];
    } catch (error) {
      console.error("Error selecting customer:", error);
      throw new Error(`Failed to fetch customer: ${error.message}`);
    }
  }

  static async editCustomerByUserIdShopId(user_id, shop_id, updateData) {
    try {
      if (!user_id || !shop_id) {
        throw new Error("Staff ID, shop ID and Staff role is required");
      }

      // First check if staff exists
      const staff = await this.selectUserByIdShopIdRole(user_id, shop_id);
      if (!staff) {
        throw new Error("Customer not found");
      }
      const updatedStaffData = {
        user_fName: updateData.user_fName || staff.user_fName,
        user_mName: updateData.user_mName || staff.user_mName,
        user_lName: updateData.user_lName || staff.user_lName,
        email: updateData.email || staff.email,
        contactNum: updateData.contactNum || staff.contactNum,
        user_address: updateData.user_address || staff.user_address,
        username: updateData.username || staff.username,
      };

      const query = `UPDATE users
            SET user_fName = ?,
                user_mName = ?,
                user_lName = ?,
                email = ?,
                contactNum = ?,
                user_address = ?,
                username = ?
            WHERE role = 'STAFF'
            AND user_id = ?
            AND shop_id = ?`;

      const result = await this.query(query, [
        updatedStaffData.user_fName,
        updatedStaffData.user_mName,
        updatedStaffData.user_lName,
        updatedStaffData.email,
        updatedStaffData.contactNum,
        updatedStaffData.user_address,
        updatedStaffData.username,
        user_id,
        shop_id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Failed to update staff");
      }

      // Return updated staff data
      return this.selectUserByIdShopIdRole(user_id, shop_id);
    } catch (error) {
      console.error("Error editing staff:", error);
      throw new Error(`Failed to editing staff: ${error.message}`);
    }
  }
}

module.exports = User;
