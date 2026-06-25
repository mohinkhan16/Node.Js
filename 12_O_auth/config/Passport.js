import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import passport from "passport";
import  GoogleStrategy  from "passport-google-oauth20";
import User from "../Model/UserModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.newUSer((user, done) => {
  done(null, user.id);
});

passport.UniqeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});