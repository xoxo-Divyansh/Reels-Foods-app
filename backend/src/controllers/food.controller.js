const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel =require("../models/save.model");
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

async function likefood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await liekModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user:user._id,
      food: foodId 
    })

    await foodModel.findByIdAndUpdate(
      foodId,
      {$inc: { likeCount: -1}
    })

    return res.status(200).json({
      message: "Food item unliked successfully",
    })
  }

  const Like = await likeModel.create({
    user: user._id,
    food: foodId,
  })

  await foodModel.findByIdAndUpdate(
    foodId,
    {$inc: { likeCount: 1}
  })

  res.status(201).json({
    message: "Food item liked successfully",
    Like
  });
}

async function savedFood( req, res) {

  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if (isAlreadySaved){
    await saveModel.deleteOne({
      user: user._id,
      food: foodId
    })

    return res.Status(200).json({
     message: "Food item unsaved successfully"
    })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })
  res.status(201).json({
    message: "Food item saved successfully",
    save
  })

}


module.exports = {
  createFood,
  getFoodItems,
  likefood,
  savedFood,
  // SavedFood
};
