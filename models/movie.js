const Joi = require("joi");
const mongoose = require("mongoose");

const castSchema = mongoose.Schema({
  name: String,
  character_name: String,
  url_small_image: String,
  imdb_code: String,
});
const movieSchema = mongoose.Schema({
  _id: Number,
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
  cast: [castSchema],
});
const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(1).required(),
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
    cast: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        character_name: Joi.string(),
        url_small_image: Joi.string(),
        imdb_code: Joi.string(),
      })
    ),
  });
  return schema.validate(movie);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
