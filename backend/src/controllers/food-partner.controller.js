const foodpartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

async function getFoodItemsById (req, res)  {
  
    const  foodpartnerId  = req.params.id;

    const foodPartner = await foodpartnerModel.findById(foodpartnerId);

    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodpartnerId });
    

    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    res.status(200).json({ 
      message: "Food Partner found successfully",
      foodPartner: {
         ...foodPartner.toObject(),
         foodItems: foodItemsByFoodPartner
      },
     });
}

module.exports = {
  getFoodItemsById
};