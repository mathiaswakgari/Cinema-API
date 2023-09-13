require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const route = express.Router();
const { validate } = require("../models/login");
const { User } = require("../models/user");

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({
    username: req.body.username,
  });
  if (!user) return res.status(400).send("Wrong email or password");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) return res.status(400).send("Wrong email or password");
  const token = jwt.sign(
    _.pick(user, ["fullname", "email", "_id", "username"]),
    "privateKey"
  );

  return res.send(token);
});

module.exports = route;
