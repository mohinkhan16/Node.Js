import express from "express";
import HttpError from "./middleware/httpError.js";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";
import Event from "./router/EventRouter.js";
const app = express();

dotenv.config({ path: "./.env" });


app.use(express.json());

app.use("/event", Event);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});


app.use((req, res, next) => {
  next(new HttpError("request route not found", 404));
});


app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "something went wrong",
  });
});

const port = 5000;

async function serverStart() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

serverStart();
