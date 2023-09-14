const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const route = express.Router();
const { validate, Movie } = require("../models/movie");

route.get("/", (req, res) => {
  Movie.find()
    .sort("title")
    .then((movies) => res.send(movies));
});
route.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  return res.send(movie);
});
route.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message); // 400; bad request

  let movie = new Movie(req.body);
  movie = await movie.save();
  res.send(movie);
});

route.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

route.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.send(movie);
});

module.exports = route;
