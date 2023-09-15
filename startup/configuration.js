const config = require("config");
const morgan = require("morgan");
module.exports = function (app) {
  // configuration
  console.log(`Application Name: ${config.get("name")}`);
  if (app.get("env") === "development") {
    console.log("Morgan enabled");
    app.use(morgan("tiny"));
  }
};
