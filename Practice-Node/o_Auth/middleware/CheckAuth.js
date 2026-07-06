import HttpError from "./HttpError.js";

const CheckAuth = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default CheckAuth;