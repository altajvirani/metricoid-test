const mongoose = require("mongoose");

const dbConn = async (db_url) => {
  await mongoose
    .connect(db_url, { dbName: "metricoid" })
    .then(() => {
      console.log("Successfully connected to database.");
    })
    .catch((err) => {
      console.error(`Error connecting database: ${err}`);
    });
};

module.exports = dbConn;
