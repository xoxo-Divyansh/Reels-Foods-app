const foodpartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// -------------------------------
// 🍱 Food Partner Auth Middleware
// -------------------------------
async function authFoodPartnerMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodpartnerModel.findById(decoded.id);

    if (!foodPartner)
      return res.status(404).json({ message: "Food Partner not found" });

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    console.error("FoodPartner Auth Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -------------------------------
// 👤 User Auth Middleware
// -------------------------------
async function authUserMiddleware(req, res, next) {
  console.log("Auth middleware hit");
  console.log("Cookies:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);

  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach decoded user
    req.user = decoded;

    console.log("✅ Auth success — User:", decoded);
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
