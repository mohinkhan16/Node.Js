import express from "express";
import passport from "../config/Passport.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.render("profile");
  },
);
export default router;