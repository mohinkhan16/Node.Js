
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./Router/userRouter.js";

const app = express();

app.use(express.json());

app.use("/JWT", router);

app.get("/", (req, res) => {
    res.json({ message: "hello from server" });
});

// Route Not Found
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

async function StartServer() {
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

StartServer();