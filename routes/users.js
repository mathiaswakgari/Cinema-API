require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const route = express.Router();
const { validate, User } = require("../models/user");

route.get("/", (req, res) => {
  User.find()
    .sort("fullname")
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

  let user = await User.findOne({
    email: req.body.email,
    username: req.body.username,
  });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["username", "fullname", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  const token = user.generateJwtToken();

  return res
    .header("x-login-token", token)
    .send(_.pick(user, ["_id", "fullname", "email", "username"]));
});

module.exports = route;
