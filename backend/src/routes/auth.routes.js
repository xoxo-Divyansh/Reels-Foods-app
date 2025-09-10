const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// User auth APIs
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);

// food Partner auth APIs
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.loginFoodPartner);
router.post("/foodpartner/logout", authController.logoutFoodPartner);

module.exports = router;