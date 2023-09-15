const config = require("config");
const morgan = require("morgan");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

// configuration

console.log(`Application Name: ${config.get("name")}`);

if (app.get("env") === "development") {
  console.log("Morgan enabled");
  app.use(morgan("tiny"));
}

// database

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
