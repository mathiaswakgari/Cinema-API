const mongoose = require("mongoose");
const config = require("config");
const logger = require("../logger");

module.exports = function () {
  // database
  mongoose
    .connect(config.get("url"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.log("info", "Connected to MongoDB..."));
};
