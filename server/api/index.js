const express = require("express");

require("dotenv").config();

const app = express();

const dbConn = require("./db");

dbConn(process.env.DB_URL);

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
