import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import EventManagment from "./routes/EventRoutes.js"

import upload from "./middleware/upload.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/event",EventManagment);

app.get("/", (req, res) => {
    res.json({
        message: "hello from server"
    });
});

app.use((req, res, next) => {
    return next(new HttpError("request route not found", 404));
});

app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statuscode || 500).json({
        message: error.message || "something went wrong"
    });
});

const port = 5000;

async function serverStart() {

    try {

        const connect = await connectDB();

        if (!connect) {
            throw new Error("failed to connect db");
        }

        app.listen(port, (err) => {

            if (err) {
                return console.log(err.message);
            }

            console.log(`server running on port ${port}`);
        });

    } catch (error) {

        console.log(error.message);
        process.exit(1);
    }
}

serverStart();