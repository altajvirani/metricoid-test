const mongoose = require("mongoose");
const ObjectID = require("mongoose").ObjectOD;

const customer = new mongoose.Schema({
  c_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customer);
