const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticateToken = require("./middlewares/authMiddleware");
const path = require('path');

require("dotenv").config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // If you need to include cookies in requests
    allowedHeaders: ['Authorization', 'Content-Type']
}));


app.use(express.json());
//Public Routes
app.use("/api/auth", authRoutes);
// Protected Routes
// Skip authentication for the get file by id route
app.use("/api/files", authenticateToken({
    skipRoutes: ["/file/:id"]
}), fileRoutes);

app.use("/api/users", authenticateToken({
    skipRoutes: ["/me"]
}), userRoutes);



// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || "An unexpected error occurred.",
    });
});



module.exports = app;
