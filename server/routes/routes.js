const Order = require("../models/Order");

const router = require("express").Router();

router.get("/get-orders", async (_, res) => {
  const orders = await Order.find();

  console.log(orders);

  res.json({
    orders,
  });
});

router.post("/new-order", async (req, res) => {});

module.exports = router;
