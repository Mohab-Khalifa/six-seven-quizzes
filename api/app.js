const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const logRoutes = require('./middleware/logger')

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Brain Bank Heist API is running",
  });
});

app.use("/", userRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;