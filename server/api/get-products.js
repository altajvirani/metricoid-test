const Product = require("../models/Product");

module.exports = async (_, res) => {
  try {
    const products = await Product.find();

    if (!products) res.status(404).json({ message: "No products found." });
    else res.json({ products });
  } catch (err) {
    res.status(500).json({
      message: `Error while fetching products: ${err}`,
    });
  }
};
