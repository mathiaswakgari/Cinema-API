const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true },
});
const Genre = mongoose.model("Genre", genreSchema);

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
  Genre.find()
    .sort("name")
    .then((genres) => res.send(genres));
});
route.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  return res.send(genre);
});

route.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  let genre = new Genre({
    _id: req.body.id,
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

route.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

route.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};
module.exports = route;
