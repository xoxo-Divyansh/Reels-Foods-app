const foodpartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const foodModel = require("../models/food.model");
const jwt = require("jsonwebtoken");

// Food Partner Authentication Middleware
async function authFoodPartnerMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodpartnerModel.findById(decoded.id);
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({
      message: "Invalid Token",
      error: err.message,
    });
  }
}

// User Authentication Middleware
async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
      error: err.message,
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
