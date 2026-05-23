import express from "express";

import httpError from "./middleWare/httpError.js";

import connectDB from "./config/db.js";

import EmployeeRoutes from "./routes/RoutesEmployee.js";

const app = express();

app.use(express.json());

app.use("/employee", EmployeeRoutes);

app.get("/", (req, res) => {
    res.json({ message: "server running" });
});

app.use((req, res, next) => {
    return next(new httpError("request route not found", 404));
});

app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    console.log(error);

    res.status(error.code || 500).json({
        success: false,
        message: error.message || "internal server error"
    });
});

const port = 5000;

async function StartServer() {

    try {

        const connect = await connectDB();

        if (!connect) {
            throw new Error("failed to connect");
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

StartServer();