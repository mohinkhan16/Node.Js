import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authrouter.js";
import profileRoutes from "./routes/Profiileroutes.js";
import passport from "./config/Passport.js";

dotenv.config({ path: "./.env" });

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "oauth-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// 404 Handler
app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

// Error Handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

// Start Server
async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server Running On Port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();