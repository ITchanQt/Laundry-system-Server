const BaseModel = require('./BaseModel');
const bcrypt = require('bcrypt');

class Admin extends BaseModel {
    static async findByEmail(email) {
        const sql = "SELECT * FROM admins WHERE email = ?";
        const results = await this.query(sql, [email]);
        return results[0];
    }

    static async create(adminData) {
        const { admin_username, email, password, admin_fName, admin_mName, admin_lName, admin_address, admin_contactNum } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO admins 
            (admin_username, email, password, admin_fName, admin_mName, admin_lName, admin_address, admin_contactNum) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return this.query(sql, [
            admin_username, 
            email, 
            hashedPassword, 
            admin_fName, 
            admin_mName, 
            admin_lName, 
            admin_address, 
            admin_contactNum
        ]);
    }
}

module.exports = Admin;