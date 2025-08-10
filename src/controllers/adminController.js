const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findByEmail(req.body.email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await Admin.create(req.body);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerAdmin };