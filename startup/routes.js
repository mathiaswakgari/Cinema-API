const express = require("express");

const homeRoute = require("../routes/home");
const moviesRoute = require("../routes/movies");
const genresRoute = require("../routes/genres");
const usersRoute = require("../routes/users");
const loginRoute = require("../routes/login");

const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
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
};
