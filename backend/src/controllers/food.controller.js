const storageService = require("../services/storage.service");
const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

// ✅ Create food
async function createFood(req, res) {
  try {
    const fileUploaded = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploaded.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food Item Created Successfully",
      food: foodItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating food", error: error.message });
  }
}

// ✅ Get all food items
async function getFoodItems(_req, res) {
  try {
    const foodItems = await foodModel.find({});
    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching food items",
      error: error.message,
    });
  }
}

// ✅ Like / Unlike a food item
async function likefood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

      return res.status(200).json({
        message: "Food item unliked successfully",
      });
    }

    const Like = await likeModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({
      message: "Food item liked successfully",
      Like,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error liking food item",
      error: error.message,
    });
  }
}

// ✅ Save / Unsave a food item
async function savedFood(req, res) {
  try {
    const user = req.user;
    const { foodId } = req.body;

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadySaved) {
      
      await saveModel.deleteOne({ user: user._id, food: foodId });

      return res.status(200).json({
        message: "Food item unsaved successfully",
      });
    }

    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });

    res.status(201).json({
      message: "Food item saved successfully",
      save,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving food item",
      error: error.message,
    });
  }
}

// saved Food videos
async function savedFoodVideos(req, res) {
  try {
    const { foodId } = req.params;

    const exists = await saveModel.findOne({ user: req.user.id, food: foodId });
    if (exists) return res.status(400).json({ message: "Already saved" });

    const newSave = await saveModel.create({
       user: req.user.id,
        food: foodId 
      });

    res.status(200).json({
      message: "Video saved successfully",
      savedItem: newSave
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving video", error: err.message });
  }
};

// ✅ Get all saved foods for the logged-in user
async function getSavedFood(req, res) {

  console.log("GET /saved hit");
  console.log("User:", req.user);
  console.log("Cookies:", req.cookies);

  try {
    const user = req.user;

        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        
    // Find all saved items for this user and populate food details
    const savedItems = await saveModel
    .find({ user: user.id })
    .populate("food");

    // Transform to send only food data (if needed)
    const formatted = savedItems.map((item) => item.food);

    res.status(200).json({
      message: "Saved items fetched successfully",
      savedItems: formatted,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching saved items",
      error: error.message,
    });
  }
}


module.exports = {
  createFood,
  getFoodItems,
  likefood,
  savedFood,
  getSavedFood,
  savedFoodVideos

};

