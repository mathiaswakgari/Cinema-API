const Joi = require("joi");
const config = require("config");
const morgan = require("morgan");
const express = require("express");
const app = express();

const homeRoute = require("./routes/home");
const moviesRoute = require("./routes/movies");
const genresRoute = require("./routes/genres");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuration

console.log(`Application Name: ${config.get("name")}`);

if (app.get("env") === "development") {
  console.log("Morgan enabled");
  app.use(morgan("tiny"));
}

// Home Section
app.use("/api", homeRoute);
// Movie Section
app.use("/api/movies", moviesRoute);
// Genre Section
app.use("/api/genres", genresRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
