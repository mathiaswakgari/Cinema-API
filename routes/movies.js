const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const asyncMiddleware = require("../middlewares/async");
const route = express.Router();
const _ = require("lodash");
const { validate, Movie } = require("../models/movie");

route.get("/", (req, res, next) => {
  if (req.query) {
    const { rating, year, genre, sortBy, orderBy } = req.query;
    req.query &&
      Movie.find({
        rating: { $gte: parseInt(rating) ? parseInt(rating) : 0 },
        year: { $gte: parseInt(year) ? parseInt(year) : 0 },
        genres: { $elemMatch: { $gte: genre ? genre_.capitalize(genre) : "" } },
      })
        .sort()
        .then((movies) => res.send(movies))
        .catch((error) => next(error));
  } else {
    Movie.find()
      .sort("title")
      .then((movies) => res.send(movies))
      .catch((error) => next(error));
  }
});
route.get("/:id", async (req, res) => {
  const movie = await Movie.findOne({ _id: parseInt(req.params.id) });
  if (!movie) return res.status(404).send("Movie not found");
  return res.send(movie);
});
route.post(
  "/",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message); // 400; bad request

    let movie = new Movie(req.body);
    movie = await movie.save();
    res.send(movie);
  })
);

route.put(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    if (!movie) return res.status(404).send("Movie not found");

    res.send(movie);
  })
);

route.delete(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.send(movie);
  })
);

module.exports = route;
