const express = require("express");
const app = express();

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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
