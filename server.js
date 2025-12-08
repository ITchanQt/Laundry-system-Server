const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const publicRoutes = require("./src/routes/publicRoutes");
const authenticate = require("./src/middlewares/authMiddleware");
const customerRoutes = require("./src/routes/customerRoutes");

const app = express();

const allowedOrigins = [
  process.env.SUPER_ADMIN_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
  process.env.STAFF_FRONTEND_URL,
  process.env.CUSTOMER_FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-API-Key", "Authorization"],
  })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Public Routes (no authentication needed)
app.use("/api/public", publicRoutes);

// Protected Routes (authentication required)
app.use("/api/auth", authRoutes);

app.use("/api/customers", customerRoutes);

//Protected Routes
app.use("/api/protected", authenticate, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, this is a prortected route!`,
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
