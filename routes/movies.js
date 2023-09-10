const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const Joi = require("joi");

const movieSchema = mongoose.Schema({
  url: String,
  imdb_code: String,
  title: String,
  slug: String,
  year: Number,
  rating: Number,
  runtime: Number,
  summary: String,
  genres: [String],
  background_image: String,
  small_cover_image: String,
  large_cover_image: String,
  medium_cover_image: String,
  yt_trailer_code: String,
  large_screenshot_image1: String,
  large_screenshot_image2: String,
  medium_screenshot_image1: String,
  medium_screenshot_image2: String,
  description_full: String,
  cast: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

route.get("/", (req, res) => {
  Movie.find()
    .sort("title")
    .then((movies) => res.send(movies));
});
route.get("/:id", (req, res) => {
  const movie = Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  return res.send(movie);
});
route.post("/", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message); // 400; bad request

  const movie = {
    id: movies.length + 1,
    title: req.body.title,
  };
  movies.push(movie);
  res.send(movie);
});

route.put("/:id", (req, res) => {
  //find
  const movie = movies.find((movie) => movie.id == req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  //validate
  const { error } = validateMovie(req.body);
  //update
  if (error) return res.status(400).send(error.message);
  movie.title = req.body.title;
  res.send(movie);
});

route.delete("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id == req.params.id);
  if (!movie) return res.status(404).send("Movie not found");

  const indexOfMovie = movies.indexOf(movie);
  movies.slice(indexOfMovie, 1);

  return res.send(movie);
});

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    url: Joi.string().min(1).required(),
    imdb_code: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    slug: Joi.string().min(1).required(),
    year: Joi.number().min(1000).required(),
    rating: Joi.number().min(1).max(10).required(),
    runtime: Joi.number().min(1).required(),
    summary: Joi.string().min(1),
    genres: Joi.array().items(Joi.string()),
    background_image: Joi.string().min(1),
    small_cover_image: Joi.string().min(1),
    large_cover_image: Joi.string().min(1),
    medium_cover_image: Joi.string().min(1),
    yt_trailer_code: Joi.string().min(1),
    large_screenshot_image1: Joi.string().min(1),
    large_screenshot_image2: Joi.string().min(1),
    medium_screenshot_image1: Joi.string().min(1),
    medium_screenshot_image2: Joi.string().min(1),
    description_full: Joi.string().min(1),
    cast: Joi.array().items(Joi.string()),
  });
  return schema.validate(movie);
};

module.exports = route;
