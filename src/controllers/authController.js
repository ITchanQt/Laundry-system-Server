const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  //Check if user already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0)
        return res.status(400).json({ message: "Email already exists" });

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //Insery new user
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      //Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000, // 1 hour
      });
      res.json({
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email },
      });
    }
  );
};

const logoutUser = (req, res) => {
  res.clearCookies("token");
  res.jsom(
    {
      message: 'Logged out successfully'
    }
  )
};

module.exports = { registerUser, loginUser, logoutUser };
