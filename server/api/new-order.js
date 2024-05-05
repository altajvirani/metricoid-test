const Product = require("../models/Product");
const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const product = req.body.hasOwnProperty("p_name") ? req.body.p_name : null;

    const isValidProduct = await Product.findOne({ p_name: product });

    if (!isValidProduct)
      res.status(400).json({ message: "Please enter a valid product name." });
    else {
      await new Order(req.body).save();
      res.json({ message: "Successfully added new order." });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error while adding order: ${err}`,
    });
  }
};
