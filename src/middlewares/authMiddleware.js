const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

    console.log('Auth Header:', authHeader); // Debug log
    console.log('Token:', token); // Debug log

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
