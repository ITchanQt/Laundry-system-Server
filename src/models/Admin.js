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
        const lastNumber = parseInt(lastId.split('-')[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSA-00001
      return `LMSA-${String(nextNumber).padStart(5, '0')}`;
    } catch (error) {
      throw new Error(`Failed to generate admin ID: ${error.message}`);
    }
  }

  static async crateAdmin(adminData) {
    try {
      const admin_id = await this.generateAdminId();
      const {
        admin_fName,
        admin_mName,
        admin_lName,
        admin_address,
        admin_username,
        admin_contactNum,
        email,
        password,
      } = adminData;
      
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
          password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        admin_id,
        admin_fName,
        admin_mName,
        admin_lName,
        admin_address,
        admin_username,
        admin_contactNum,
        email,
        hashedPassword,
      ]);
    } catch (error) {
      throw new Error(`Failed to create admin: ${error.message}`);
    }
  }

  static async findByEmailOrUsername(emailOrUsername) {
    const sql = "SELECT * FROM admins WHERE email = ? OR admin_username = ?";
    const results = await this.query(sql, [emailOrUsername, emailOrUsername]);
    return results[0];
  }

  static async login(emailOrUsername, password) {
    try {
        // Add debug logging
        console.log('Login attempt with:', { emailOrUsername, password });

        const admin = await this.findByEmailOrUsername(emailOrUsername);
        console.log('Found admin:', admin ? 'Yes' : 'No');
        
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
                role: 'admin'
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            token,
            admin: {
                id: admin.admin_id,
                username: admin.admin_username,
                email: admin.email,
                role: 'admin'
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
  }

  static async getAllAdmins() {
    try {
      const sql = "SELECT admin_id, admin_fName, admin_mName, admin_lName, admin_address, admin_username, admin_contactNum, email, date_registered, role, status FROM admins";
      const results = await this.query(sql);
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch admins: ${error.message}`);
    }
  }
}

module.exports = Admin;
