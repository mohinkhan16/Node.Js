import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/authrouter.js";
import passport from "./config/Passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "oauth-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", router);

app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Running On Port", process.env.PORT || 5000);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();