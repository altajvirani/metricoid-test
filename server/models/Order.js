const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  c_name: {
    type: String,
    required: true,
  },
  p_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  o_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
