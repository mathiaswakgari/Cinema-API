const logger = require("../logger");
const error = (err, req, res, next) => {
  // Logging exception
  logger.log("error", err.message, err);
  // client message
  res.status(500).send("Unexpected error occurred");
};
module.exports = error;
