const error = (err, req, res, next) => {
  // Logging exception
  res.status(500).send("Unexpected error occurred");
};
module.exports = error;
