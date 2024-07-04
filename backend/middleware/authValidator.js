const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
};
