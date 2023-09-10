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

const createGenre = async (body) => {
  const genre = new Genre({
    _id: body.id,
    name: body.name,
  });

  try {
    const result = await genre.save();
    return result;
  } catch (error) {
    return error.message;
  }
};

const getGenres = async () => {
  const genres = await Genre.find();
  return genres;
};

const getGenre = async (id) => {
  const genre = await Genre.findById(id);
  if (!genre) return;
  return genre;
};

const updateGenre = async (body) => {
  const genre = await Genre.findById(body.id);
  if (!genre) return;

  genre.name = body.name;

  const result = await genre.save();
  return result;
};

const deleteGenre = async (id) => {
  const genre = await Genre.findByIdAndRemove(id);
  return genre;
};

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

route.post("/", (req, res) => {
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.message);
  // createGenre(req.body)
  //   .then((genre) => res.send(genre))
  //   .catch((error) => res.send(error));
});

route.put("/:id", async (req, res) => {
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.message);
  // const genre = await getGenre(req.params.id);
  // if (!genre) return res.status(404).send("Genre not found.");
  // updateGenre(req.body)
  //   .then((genre) => res.send(genre))
  //   .catch((error) => res.status(404).send("Genre not found"));
});

route.delete("/:id", (req, res) => {
  // deleteGenre(req.params.id)
  //   .then((genre) => res.send(genre))
  //   .catch((error) => res.status(404).send("Genre not found."));
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};
module.exports = route;
