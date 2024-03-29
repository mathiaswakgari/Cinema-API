const express = require("express");
require("dotenv").config();
const app = express();

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);

require("./startup/logging")();
require("./startup/db")();
require("./startup/configuration")(app);
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
