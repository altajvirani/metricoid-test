const express = require("express");
const PORT = 5000;

const app = express();

const dbConn = require("./db");

dbConn();

const cors = require("cors");

app.use(cors());

app.use(express.json());

const routes = require("./routes/routes");

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
