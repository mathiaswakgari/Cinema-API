const express = require("express");
const route = express.Router();

const movies = [
  { id: 1, title: "movie One" },
  { id: 2, title: "movie Two" },
  { id: 3, title: "movie Three" },
];

route.get("/", (req, res) => {
  res.send(movies);
});
route.get("/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id == req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");
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
  });
  return schema.validate(movie);
};

module.exports = route;
