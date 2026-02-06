require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");   // your passport config

const { UsersModel } = require("./model/UsersModel");
const ExpressError = require("./error/ErrorExpress");
const wrapAsync = require("./error/WrapAsync");

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: "passportsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
  res.send("API Running");
});

/* Register */
app.post("/addnewUser", wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ExpressError(400, "All fields required");
  }

  const existingUser = await UsersModel.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, "User already exists");
  }

  const user = new UsersModel({ name, email, password });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
}));

/* Login */
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    req.login(user, err => {
      if (err) return next(err);

      res.json({
        message: "Login successful",
        user
      });
    });
  })(req, res, next);
});

/* Logout */
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

/* Protected Route */
app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not logged in"
    });
  }
  res.json(req.user);
});

/* -------------------- ERROR HANDLER -------------------- */

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
});

/* -------------------- DB + SERVER -------------------- */

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
