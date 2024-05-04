const mongoose = require("mongoose");
const ObjectID = require("mongoose").ObjectOD;

const product = new mongoose.Schema({
  p_name: {
    type: String,
    required: true,
  },
  p_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", product);
