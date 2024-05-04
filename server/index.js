const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

const dbConn = require("./db");

dbConn(process.env.DB_URL);

const cors = require("cors");

app.use(cors());

app.use(express.json());

const routes = require("./routes/routes");

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
