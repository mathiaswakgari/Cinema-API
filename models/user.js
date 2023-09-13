const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
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

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    fullName: Joi.string().min(1).max(127).required(),
    userName: Joi.string().min(1).max(127).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
};

exports.User = User;
exports.validate = validateUser;
