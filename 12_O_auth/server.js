import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/authrouter.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.set("view engine", "ejs");

app.use("/", router);

app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "internal server error",
  });
});

async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();