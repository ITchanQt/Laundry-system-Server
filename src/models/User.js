const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    static async generateUserId() {
    try {
      // Get the highest admin ID
      const sql = "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1";
      const results = await this.query(sql);

      let nextNumber = 1;
      if (results && results.length > 0) {
        const lastId = results[0].user_id;
        const lastNumber = parseInt(lastId.split('-')[1]);
        nextNumber = lastNumber + 1;
      }

      // Format: LMSU-00001
      return `LMSU-${String(nextNumber).padStart(5, '0')}`;
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
            status = 'ACTIVE',
            registered_by = 'ADMIN'
        } = userData;

        // Validate required fields
        if (!username || !email || !password || !user_fName || !user_lName || !contactNum) {
            throw new Error('Missing required fields');
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
            registered_by
        ]);
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
  }

    static async verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    static async findByEmailOrUsername(emailOrUsername) {
        const sql = "SELECT * FROM users WHERE email = ? OR username = ?";
        const results = await this.query(sql, [emailOrUsername, emailOrUsername]);
        return results[0];
    }

    static async login(emailOrUsername, password) {
        try {
            const user = await this.findByEmailOrUsername(emailOrUsername);
            
            if (!user) {
                return { error: "Invalid credentials" };
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return { error: "Invalid credentials" };
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: 'user' },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: 'user'
                }
            };
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        const query = "SELECT * from users";
        const results = await this.query(query);
        return results; 
    }

    static async editUserByID(userId, updateData) {
        try {
            if (!userId) {
                throw new Error('User ID is required for update');
            }

            const user = await this.findByUserId(userId);
            if (!user) {
                throw new Error('User not found');
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
                userId
            ]);

            if (result.affectedRows === 0) {
                throw new Error('Failed to update user');
            };

            return this.findByUserId(userId);
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    static async searchUserByIdOrNameWithCustomerRole() {
        try {
            const sql = `SELECT * FROM users
                         WHERE role = 'Customer'`;
            const results = await this.query(sql);
            return results;
        } catch (error) {
            throw new Error(`Failed to search users: ${error.message}`);
        }
    }
}

module.exports = User;