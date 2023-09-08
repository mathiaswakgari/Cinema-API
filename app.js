const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { id: 1, title: "movie One" },
  { id: 2, title: "movie Two" },
  { id: 3, title: "movie Three" },
];
const genres = [
  { id: 0, name: "Action" },
  { id: 1, name: "Adventure" },
  { id: 2, name: "Animation" },
  { id: 3, name: "Biography" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Crime" },
  { id: 6, name: "Documentary" },
  { id: 7, name: "Drama" },
  { id: 8, name: "Family" },
];
// Movie Section
app.get("/", (req, res) => {
  res.send("Welcome to Cinema");
});
app.get("/api/movies", (req, res) => {
  res.send(movies);
});
app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id == req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");
  return res.send(movie);
});
app.post("/api/movies", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message); // 400; bad request

  const movie = {
    id: movies.length + 1,
    title: req.body.title,
  };
  movies.push(movie);
  res.send(movie);
});

app.put("/api/movies/:id", (req, res) => {
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

app.delete("/api/movies/:id", (req, res) => {
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

// Genre Section

app.get("/api/genres", (req, res) => {
  res.send(genres);
});
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  return res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
