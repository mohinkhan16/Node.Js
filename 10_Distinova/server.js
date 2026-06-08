import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

import DistinovaRoutes from "./routes/DistinovaRoutes.js";

const app = express();

app.use(express.json());

app.use("/distinova",DistinovaRoutes)

app.get("/", (req, res) => {
    res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
    next(new HttpError("Request route not found", 404));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

const port = 5000;

async function startServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            return console.log("Failed to connect DB");
        }

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();