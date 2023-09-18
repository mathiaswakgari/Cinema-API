const { default: mongoose } = require("mongoose");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id))
    return res.status(404).send("Invalid ID.");
  next();
};
