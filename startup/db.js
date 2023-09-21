const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../logger");

module.exports = function () {
  // database
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.log("info", "Connected to MongoDB..."));
};
