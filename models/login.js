const Joi = require("joi");
const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
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

const Login = mongoose.model("Login", loginSchema);

const validateLogin = (req) => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(127).required(),
    password: Joi.string().min(8).max(127).required(),
  });

  return schema.validate(req);
};

exports.Login = Login;
exports.validate = validateLogin;
