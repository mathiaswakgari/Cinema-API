require("dotenv").config();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.methods.generateJwtToken = function () {
  const token = jwt.sign(
    _.pick(this, ["fullname", "email", "_id", "username"]),
    process.env.JWTkey
  );
  return token;
};
const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    fullname: Joi.string().min(1).max(127).required(),
    username: Joi.string().min(1).max(127).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
  });

  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
