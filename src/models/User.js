const BaseModel = require("./BaseModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User extends BaseModel {
  static async findByUserId(userId) {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const results = await this.query(sql, [userId]);
    return results[0];
  }

  static async findByEmail(shop_id, email) {
    const sql = "SELECT * FROM users WHERE shop_id = ? AND email = ?";
    const results = await this.query(sql, [shop_id, email]);
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
        user_mName = null,
        user_lName,
        user_address = null,
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

  static async loginCustomer(shop_id, emailOrUsername, password) {
    try {
      console.log("Login attempt with:", { emailOrUsername, password });

      if (!shop_id) {
        return {
          error: "Invalid shop. Please login from the correct shop URL.",
        };
      }
      
      if(emailOrUsername === 'WALK IN' || password === "NULL" || password === " ") {
        return { error: "Error login" };
      }

      const shopCheck = await this.isShopActive(shop_id);

      if (!shopCheck.exists) {
        return { error: "This shop does not exist in our system." };
      }

      if (shopCheck.status === "Pending") {
        return {
          error:
            "Your shop registration is still pending approval. Our team is currently reviewing your business documents.",
        };
      }

      if (shopCheck.status !== "Active") {
        return {
          error:
            "This shop's access has been deactivated. Please contact support.",
        };
      }

      const user = await this.findByEmailOrUsername(shop_id, emailOrUsername);
      console.log("Found user:", user ? "Yes" : "No");

      if (!user) {
        return { error: "Invalid credentials" };
      }

      if (user.status === "PENDING") {
        return {
          error:
            "Your account is pending approval. Please contact the super admin or admin.",
        };
      }

      if (user.status === "INACTIVE") {
        return { error: "Your account has been deactivated. Access denied." };
      }

      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match ? "Yes" : "No");

      if (!match) {
        return { error: "Invalid credentials" };
      }

      if (user.status !== "ACTIVE") {
        return { error: "Account is not active." };
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
        { expiresIn: "1h" },
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

  static async loginStaff(shop_id, emailOrUsername, password) {
    try {
      console.log("Login attempt with:", { emailOrUsername, password });

      if (!shop_id) {
        return {
          error: "Invalid shop. Please login from the correct shop URL.",
        };
      }

      const shopCheck = await this.isShopActive(shop_id);

      if (!shopCheck.exists) {
        return { error: "This shop does not exist in our system." };
      }

      if (shopCheck.status === "Pending") {
        return {
          error:
            "Your shop registration is still pending approval. Our team is currently reviewing your business documents.",
        };
      }

      if (shopCheck.status !== "Active") {
        return {
          error:
            "This shop's access has been deactivated. Please contact support.",
        };
      }

      const user = await this.findByEmailOrUsernameStaffRole(
        shop_id,
        emailOrUsername,
      );
      console.log("Found user:", user ? "Yes" : "No");

      if (!user) {
        return { error: "Invalid credentials" };
      }

      if (user.status === "PENDING") {
        return {
          error:
            "Your account is pending approval. Please contact the super admin.",
        };
      }

      if (user.status === "INACTIVE") {
        return { error: "Your account has been deactivated. Access denied." };
      }

      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match ? "Yes" : "No");

      if (!match) {
        return { error: "Invalid credentials" };
      }

      if (user.status !== "ACTIVE") {
        return { error: "Account is not active." };
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
        { expiresIn: "1h" },
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
      console.error("User Login error:", error);
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
        user_mName: updateData.user_mName || user.user_mName,
        user_lName: updateData.user_lName || user.user_lName,
        username: updateData.username || user.username,
        email: updateData.email || user.email,
        user_address: updateData.user_address || user.user_address,
        contactNum: updateData.contactNum || user.contactNum,
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
