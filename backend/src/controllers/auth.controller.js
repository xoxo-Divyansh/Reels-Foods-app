const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// (Register) User controller
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User Register Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

//(login) User Controller
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invelid Email Or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invelid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Logedin Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

// (Logout) User Controller
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logout Successfully",
  });
}

// (Register) FoodPartner Controller
async function registerFoodPartner(req, res) {
  
  const { businessName, contactName, businessEmail, phoneNumber, address, password, 
  } = req.body;

  const isAccountExist = await foodpartnerModel.findOne({
    businessEmail,
  });

  if (isAccountExist)
    return res.status(400).json({
      message: "Account already Exists",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodpartnerModel.create({
    businessName,
    businessEmail,
    password: hashedPassword,
    phoneNumber,
    address,
    contactName,
  });
  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "foodPartner's Account register Successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.businessName,
      email: foodPartner.businessEmail,
      contactName: foodPartner.contactName,
      phone: foodPartner.phoneNumber,
      address: foodPartner.address,
    },
  });
}

// (Login) FoodPartner  Controller
async function loginFoodPartner(req, res) {
  const { businessEmail, password } = req.body;
  const foodPartner = await foodpartnerModel.findOne({
    businessEmail,
  });
  if (!foodPartner) {
    return res.status(400).json({
      message: "Invelid Username Or Password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invelid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "FoodPartner Register Successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.businessEmail,
      name: foodPartner.businessName,
    },
  });
}

// (Logout) FoodPartner Controller
function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner Logout Successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
