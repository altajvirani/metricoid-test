const Order = require("../models/Order");
const Product = require("../models/Product");

const router = require("express").Router();

router.get("/get-products", async (_, res) => {
  try {
    const products = await Product.find();

    if (!products) res.status(404).json({ message: "No products found." });
    else res.json({ products });
  } catch (err) {
    res.status(500).json({
      message: `Error while fetching products: ${err}`,
    });
  }
});

router.get("/get-orders", async (_, res) => {
  try {
    const orders = await Order.find();

    if (!orders) res.status(404).json({ message: "No orders found." });
    else res.json({ orders });
  } catch (err) {
    res.status(500).json({
      message: `Error while fetching orders: ${err}`,
    });
  }
});

router.post("/new-order", async (req, res) => {
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
});

module.exports = router;
