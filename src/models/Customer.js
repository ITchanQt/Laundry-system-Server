const BaseModel = require('./BaseModel');

class Customer extends BaseModel {
    static async findByCustomerId(customerId) {
        const sql = "SELECT * FROM customers WHERE cus_id = ?";
        const results = await this.query(sql, [customerId]);
        return results[0];
    }

    static async generateCustomerId() {
        try {
            // Get current date components
            const date = new Date();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = String(date.getFullYear());
            
            // Get the date prefix
            const datePrefix = `${month}${day}${year}-`;

            // Get the last customer ID for today
            const sql = "SELECT cus_id FROM customers WHERE cus_id LIKE ? ORDER BY cus_id DESC LIMIT 1";
            const results = await this.query(sql, [`${datePrefix}%`]);

            let sequence = '00001';
            
            if (results && results.length > 0) {
                // Extract the sequence number from the last ID
                const lastId = results[0].cus_id;
                const lastSequence = parseInt(lastId.split('-')[1]);
                // Increment and pad with zeros
                sequence = String(lastSequence + 1).padStart(5, '0');
            }

            return `${datePrefix}${sequence}`;
        } catch (error) {
            throw new Error(`Failed to generate customer ID: ${error.message}`);
        }
    }

    static async registerCustomer(customerData) {
        try {
            // Generate the customer ID
            const cus_id = await this.generateCustomerId();
            
            const {
                cus_fName,
                cus_lName,
                cus_eMail,
                cus_phoneNum,
                cus_address,
                cus_city,
                cus_zipCode,
                cus_type
            } = customerData;

            const sql = `INSERT INTO customers 
                (cus_id, cus_fName, cus_lName, cus_eMail, cus_phoneNum, cus_address, cus_city, cus_zipCode, cus_type)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            return this.query(sql, [
                cus_id,
                cus_fName,
                cus_lName,
                cus_eMail,
                cus_phoneNum,
                cus_address,
                cus_city,
                cus_zipCode,
                cus_type
            ]);
        } catch (error) {
            throw new Error(`Failed to register customer: ${error.message}`);
        }
    }
}

module.exports = Customer;