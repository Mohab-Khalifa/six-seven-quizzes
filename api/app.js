const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");

const app = express();

app.use(cors());
app.use(express.json());

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

module.exports = app;