const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User extends BaseModel {
    static async findByEmail(email) {
        const sql = "SELECT * FROM users WHERE email = ?";
        const results = await this.query(sql, [email]);
        return results[0];
    }

    static async create(userData) {
        const { username, email, password, user_fName, user_mName, user_lName, user_address, contactNum, role, status } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users 
            (username, email, password, user_fName, user_mName, user_lName, user_address, contactNum, role, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return this.query(sql, [
            username, 
            email, 
            hashedPassword, 
            user_fName, 
            user_mName, 
            user_lName, 
            user_address, 
            contactNum,
            role,
            status
        ]);
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    static async login(email, password) {
        try {
            const user = await this.findByEmail(email);
            
            if (!user) {
                return { error: "Invalid credentials" };
            }

            const match = await bcrypt.compare(password, user.password);
            
            if (!match) {
                return { error: "Invalid credentials" };
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
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