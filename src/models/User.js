const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User extends BaseModel {
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
            username, 
            email, 
            password,
            user_fName,
            user_mName = null, // Optional field
            user_lName,
            user_address = null, // Optional field
            contactNum,
            role = 'Customer', // Default role
            status = 'active', // Default status
            registered_by = "Admin" // Optional field
        } = userData;

        // Validate required fields
        if (!username || !email || !password || !user_fName || !user_lName || !contactNum) {
            throw new Error('Missing required fields');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users 
            (user_id, username, email, password, user_fName, user_mName, user_lName, 
             user_address, contactNum, role, status, registered_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return this.query(sql, [
            user_id,
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
}

module.exports = User;