const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const { validate, Genre } = require("../models/genre");

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let genre = new Genre({
    _id: req.body.id,
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

route.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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

module.exports = route;
