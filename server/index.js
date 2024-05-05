const express = require("express");
const app = express();

require("dotenv").config();

const dbConn = require("./db");
const DB_URL = process.env.DB_URL;
dbConn(DB_URL);

const cors = require("cors");
app.use(cors());

const routes = require("./routes");
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
