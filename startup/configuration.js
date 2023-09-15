const config = require("config");
const morgan = require("morgan");
const logger = require("../logger");
module.exports = function (app) {
  // configuration
  logger.log("info", `Application Name: ${config.get("name")}`);
  if (app.get("env") === "development") {
    console.log("Morgan enabled");
    app.use(morgan("tiny"));
  }
};
