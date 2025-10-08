const express = require("express");
const foodController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");
    
const router = express.Router();
  


// GET /api/food-partner/:id [protected]
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItemsById);


    module.exports = router;