const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const { validate, User } = require("../models/user");

route.get("/", (req, res) => {
  User.find()
    .sort("fullName")
    .then((users) => res.send(users));
});

route.get("/:id", async (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found.");
  return res.send(user);
});

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = new User(req.body);
  await user.save();
  return res.send(user);
});

module.exports = route;
