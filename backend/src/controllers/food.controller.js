const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  // Upload file to storage service
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
}

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
    


module.exports = {
  createFood,
  getFoodItems,
  // likefood,
  // savedfood,
  // getSavedFood
};
