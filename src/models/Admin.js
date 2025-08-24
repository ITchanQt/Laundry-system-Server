const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Admin extends BaseModel {
    static async findByUsername(username) {
        const sql = "SELECT * FROM admins WHERE admin_username = ?";
        const results = await this.query(sql, [username]);
        return results[0];
    }

    static async login(username, password) {
        try {
            const admin = await this.findByUsername(username);
            if (!admin) {
                return { error: "Invalid credentials" };
            }
            
            const match = await bcrypt.compare(password, admin.password);
            if (!match) {
                return { error: "Invalid credentials" };
            }

            const token = jwt.sign(
                { 
                    id: admin.id, 
                    username: admin.admin_username,
                    role: 'admin'
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return {
                token,
                admin: {
                    id: admin.id,
                    username: admin.admin_username,
                    role: 'admin'
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Admin;