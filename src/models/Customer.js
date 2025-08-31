const BaseModel = require("./BaseModel");

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
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = String(date.getFullYear());

      // Get the date prefix
      const datePrefix = `${month}${day}${year}-`;

      // Get the last customer ID for today
      const sql =
        "SELECT cus_id FROM customers WHERE cus_id LIKE ? ORDER BY cus_id DESC LIMIT 1";
      const results = await this.query(sql, [`${datePrefix}%`]);

      let sequence = "00001";

      if (results && results.length > 0) {
        // Extract the sequence number from the last ID
        const lastId = results[0].cus_id;
        const lastSequence = parseInt(lastId.split("-")[1]);
        // Increment and pad with zeros
        sequence = String(lastSequence + 1).padStart(5, "0");
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
        cus_type,
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
        cus_type,
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

  static async insertCustomerReceipt(customerReceiptData) {
    try {
      // Validate required customer ID
      if (!customerReceiptData.cus_id) {
        throw new Error("Customer ID is required");
      }

      // Fetch customer details first
      const customer = await this.findByCustomerId(customerReceiptData.cus_id);
      if (!customer) {
        throw new Error("Customer not found");
      }

      const newLaundryId = await this.generateLaundryId();

      // Set default values for optional fields
      const {
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
                cus_id, 
                cus_name, 
                cus_eMail, 
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      await this.query(sql, [
        newLaundryId,
        customer.cus_id,
        `${customer.cus_fName} ${customer.cus_lName}`,
        customer.cus_eMail,
        customer.cus_phoneNum,
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
}

module.exports = Customer;
