const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true },
});
const Genre = mongoose.model("Genre", genreSchema);
const validateGenre = (genre) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};
exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
