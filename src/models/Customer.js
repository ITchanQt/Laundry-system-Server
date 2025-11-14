const BaseModel = require("./BaseModel");

class Customer extends BaseModel {
  static async findAll() {
    const sql = "SELECT * FROM customers";
    const results = await this.query(sql);
    return results;
  }

  static async findByCustomerId(customerId) {
    const sql = "SELECT * FROM customers WHERE cus_id = ?";
    const results = await this.query(sql, [customerId]);
    return results[0];
  }

  static async generateCustomerId() {
    try {
      // Get current date components
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = String(date.getFullYear());

      // Get the date prefix
      const datePrefix = `${month}${day}${year}-`;

      // Get the last customer ID for today
      const sql =
        "SELECT laundryId FROM customer_receipt WHERE laundryId LIKE ? ORDER BY laundryId DESC LIMIT 1";
      const results = await this.query(sql, [`${datePrefix}%`]);

      let sequence = "00001";

      if (results && results.length > 0) {
        // Extract the sequence number from the last ID
        const lastId = results[0].laundryId;
        const lastSequence = parseInt(lastId.split("-")[1]);
        // Increment and pad with zeros
        sequence = String(lastSequence + 1).padStart(5, "0");
      }
      console.log(sequence);
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
        cus_role = "CUSTOMER", 
        cus_status = "PENDING",
        cus_phoneNum,
        cus_address,
        cus_username,
        registeredBy
      } = customerData;

      const sql = `INSERT INTO customers 
                (cus_id, cus_fName, cus_lName, cus_eMail, cus_role, cus_status, cus_phoneNum, cus_address, cus_username, registeredBy)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      return this.query(sql, [
        cus_id,
        cus_fName,
        cus_lName,
        cus_eMail,
        cus_role,
        cus_status,
        cus_phoneNum,
        cus_address,
        cus_username,
        registeredBy
      ]);
    } catch (error) {
      throw new Error(`Failed to register customer: ${error.message}`);
    }
  }

  static async generateLaundryId() {
    try {
      // Query to get the highest laundry ID
      const sql =
        "SELECT laundryId FROM customer_receipt ORDER BY laundryId DESC LIMIT 1";
      const results = await this.query(sql);

      let nextId = 1; // Default start if no records exist

      if (results && results.length > 0) {
        // Extract the numeric value and increment
        const lastId = parseInt(results[0].laundryId);
        nextId = lastId + 1;
      }

      // Pad with leading zeros to make it 6 digits
      return String(nextId).padStart(6, "0");
    } catch (error) {
      throw new Error(`Failed to generate laundry ID: ${error.message}`);
    }
  }

  static async findUserCustomerById(userId) {
    const sql = "SELECT * FROM users WHERE user_id = ?";
    const results = await this.query(sql, [userId]);
    return results[0];
  }

  static async insertCustomerReceipt(customerReceiptData) {
    try {
      // Validate required customer ID
      if (!customerReceiptData.userId) {
        throw new Error("Customer ID is required");
      }

      // Fetch customer details first
      const customer = await this.findUserCustomerById(customerReceiptData.userId);
      if (!customer) {
        throw new Error("Customer not found");
      }

      const newLaundryId = await this.generateCustomerId();

      // Set default values for optional fields
      const {
        shop_id,
        batch = 0,
        shirts = 0,
        pants = 0,
        jeans = 0,
        shorts = 0,
        towels = 0,
        pillow_case = 0,
        bed_sheets = 0,
        washing = "",
        kg = 0,
        num_items = 0,
        total_amount = "0",
      } = customerReceiptData;

      const sql = `
            INSERT INTO customer_receipt (
                laundryId,
                shop_id, 
                cus_id, 
                cus_name, 
                cus_address, 
                cus_phoneNum, 
                batch, 
                shirts, 
                pants, 
                jeans, 
                shorts, 
                towels, 
                pillow_case, 
                bed_sheets, 
                washing, 
                kg, 
                num_items, 
                total_amount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      await this.query(sql, [
        newLaundryId,
        shop_id,
        customer.user_id,
        `${customer.user_fName} ${customer.user_lName}`,
        customer.user_address,
        customer.contactNum,
        batch,
        shirts,
        pants,
        jeans,
        shorts,
        towels,
        pillow_case,
        bed_sheets,
        washing,
        kg,
        num_items,
        total_amount,
      ]);

      // Return the generated ID
      return { newLaundryId };
    } catch (error) {
      throw new Error(`Failed to insert customer receipt: ${error.message}`);
    }
  }

  static async editCustomerbyId(customerId, updateData) {
    try {
        if (!customerId) {
            throw new Error("Customer ID is required");
        }

        // First check if customer exists
        const customer = await this.findByCustomerId(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }

        // Prepare update data with existing values as fallback
        const updatedData = {
            cus_fName: updateData.cus_fName || customer.cus_fName,
            cus_lName: updateData.cus_lName || customer.cus_lName,
            cus_eMail: updateData.cus_eMail || customer.cus_eMail,
            cus_role: updateData.cus_role || customer.cus_role,
            cus_status: updateData.cus_status || customer.cus_status,
            cus_phoneNum: updateData.cus_phoneNum || customer.cus_phoneNum,
            cus_address: updateData.cus_address || customer.cus_address,
            cus_username: updateData.cus_username || customer.cus_username
        };

        const query = `UPDATE customers
            SET cus_fName = ?,
                cus_lName = ?,
                cus_eMail = ?,
                cus_role = ?,
                cus_status = ?,
                cus_phoneNum = ?,
                cus_address = ?,
                cus_username = ?
            WHERE cus_id = ?`;
          
        const result = await this.query(query, [
            updatedData.cus_fName,
            updatedData.cus_lName,
            updatedData.cus_eMail,
            updatedData.cus_role,
            updatedData.cus_status,
            updatedData.cus_phoneNum,
            updatedData.cus_address,
            updatedData.cus_username,
            customerId
        ]);

        if (result.affectedRows === 0) {
            throw new Error("Failed to update customer");
        }

        // Return updated customer data
        return this.findByCustomerId(customerId);
    } catch (error) {
        throw new Error(`Failed to update customer: ${error.message}`);
    }
}
}

module.exports = Customer;
