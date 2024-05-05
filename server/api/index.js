const express = require("express");

require("dotenv").config();

const app = express();

const dbConn = require("./db");

dbConn(process.env.DB_URL);

const cors = require("cors");

app.use(cors({}));

app.use({
  origin: "https://metricoid-test.vercel.app",
});

const getProducts = require("./get-products");
const getOrders = require("./get-orders");
const newOrder = require("./new-order");

app.use("/get-products", getProducts);
app.use("/get-orders", getOrders);
app.use("/new-order", newOrder);
