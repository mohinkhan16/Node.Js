import express from "express";
import session from "express-session";
import dotenv from "dotenv";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";;
import passport from "./config/passport.js";
import authroute from "./routes/authroutes.js";
import profileroute from "./routes/profileroute.js"

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());


app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.use("/auth", authroute);
app.use("/profile", profileroute);

app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

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