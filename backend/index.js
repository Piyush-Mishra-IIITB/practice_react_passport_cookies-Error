require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { UsersModel } = require("./model/UsersModel");
const ExpressError = require("./error/ErrorExpress");
const wrapAsync = require("./error/WrapAsync");

const app = express();
const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Register
app.post(
  "/addnewUser",
  wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ExpressError(400, "All fields required");
    }

    const existingUser = await UsersModel.findOne({ email });

    if (existingUser) {
      throw new ExpressError(400, "User already exists");
    }

    const newUser = new UsersModel({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });
  })
);

// Login
app.post(
  "/login",
  wrapAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ExpressError(400, "All fields required");
    }

    const user = await UsersModel.findOne({ email });

    if (!user) {
      throw new ExpressError(400, "User not found");
    }

    if (password !== user.password) {
      throw new ExpressError(400, "Invalid credentials");
    }

    res.json({
      message: "Login successful"
    });
  })
);

// ❗ Global Error Handler (always last)
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).json({
    error: message
  });
});

// Connect DB & Start Server
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed");
    console.log(err);
  });
