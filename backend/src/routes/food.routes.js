const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// POST /api/food/ - [protected] //create food
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

// GET /api/food - [protected]  //get all food items
router.get("/",
   authMiddleware.authUserMiddleware,
    foodController.getFoodItems);

//POST Like food - [protected] //like and unlike food
router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likefood
);

//POST save food - [protected] //save and unsave food
router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.savedFood
);

router.post("/save/:foodId",
   authMiddleware.authUserMiddleware,
   foodController.savedFoodVideos);

// GET /api/food/saved - [protected] //get all saved food items for a user
router.get(
  "/saved",
  authMiddleware.authUserMiddleware,
  foodController.getSavedFood
);


module.exports = router;
