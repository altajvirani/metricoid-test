const Order = require("../models/Order");

module.exports = async (_, res) => {
  try {
    const orders = await Order.find();

    if (!orders) res.status(404).json({ message: "No orders found." });
    else res.json({ orders });
  } catch (err) {
    res.status(500).json({
      message: `Error while fetching orders: ${err}`,
    });
  }
};
