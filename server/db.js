const mongoose = require("mongoose");

const dbConn = async () => {
  const db_url =
    "mongodb+srv://altajvirani:altajvirani@cluster0.vs2zuub.mongodb.net/";

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
