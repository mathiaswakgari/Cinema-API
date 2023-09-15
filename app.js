const config = require("config");
const winston = require("winston");
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const error = require("./middlewares/error");
const app = express();

const homeRoute = require("./routes/home");
const moviesRoute = require("./routes/movies");
const genresRoute = require("./routes/genres");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Home Section
app.use("/api", homeRoute);
// Movie Section
app.use("/api/movies", moviesRoute);
// Genre Section
app.use("/api/genres", genresRoute);
// User Section
app.use("/api/users", usersRoute);
// Login Section
app.use("/api/login", loginRoute);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
