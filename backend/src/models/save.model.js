const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },

    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food", // Reference to the Food model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const saveModel = mongoose.model("Save", saveSchema);
module.exports = saveModel;
