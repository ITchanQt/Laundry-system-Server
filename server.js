const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const authenticate = require("./src/middlewares/authMiddleware");

const app = express();

// app.use(cors({
//     origin: "http://localhost:5000", //Frontend URL(Adjust as needed)
//     credentials: true
// }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Public Routes
app.use("/api/auth", authRoutes);

//Protected Routes
app.get("/api/protected", authenticate, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, this is a prortected route!` });
});


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
