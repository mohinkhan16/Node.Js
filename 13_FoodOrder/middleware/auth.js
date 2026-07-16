import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("Authorization header is required", 401));
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            return next(new HttpError("Authentication failed", 401));
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        next(new HttpError("Authentication failed", 401));
    }
};

export default auth;