const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true 
   },
   contactName: {
      type: String,   // <- Number se String kar diya
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone: {
      type: Number,
   },
   password: {
      type: String,
      required: true
   },
   address: {
      type: String
   }
},
{
   timestamps: true
});

const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema);

module.exports = foodpartnerModel;
