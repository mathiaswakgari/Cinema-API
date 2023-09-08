const express = require("express");
const route = express.Router();

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

route.get("/", (req, res) => {
  res.send(genres);
});
route.get("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  return res.send(genre);
});

route.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  return res.send(genre);
});

route.put("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.name = req.body.name;
  return res.send(genre);
});

route.delete("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");

  const genreIndex = genres.indexOf(genre);
  genres.slice(genreIndex, 1);

  return res.send(genre);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};
module.exports = route;
