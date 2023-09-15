const config = require("config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const app = express();
const logger = require("./logger");
require("./startup/routes")(app);

// handle uncaught exception(Node-level)

process.on("uncaughtException", (ex) => {
  logger.log("error", ex.message, ex);
  process.exit(1);
});

// handle rejected promises(Node-level)

process.on("unhandledRejection", (ex) => {
  logger.log("error", ex.message, ex);
  process.exit(1);
});

// configuration

console.log(`Application Name: ${config.get("name")}`);

if (app.get("env") === "development") {
  console.log("Morgan enabled");
  app.use(morgan("tiny"));
}

// database

mongoose
  .connect(config.get("url"), {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) =>
    console.error("Failed connecting to MongoDB.", error.message)
  );

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
