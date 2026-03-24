const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Brain Bank Heist API is running",
  });
});

// Routes
app.use("/", userRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;