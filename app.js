const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { id: 1, title: "movie One" },
  { id: 2, title: "movie Two" },
  { id: 3, title: "movie Three" },
];

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

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
  });
  return schema.validate(movie);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
