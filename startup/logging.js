const logger = require("../logger");
module.exports = function () {
  // handle uncaught exception(Node-level)

  process.on("uncaughtException", (ex) => {
    logger.log("error", ex.message, ex);
    process.exit(1);
  });

  // handle rejected promises(Node-level)

  process.on("unhandledRejection", (ex) => {
    logger.log("error", ex.message, ex);
    process.exit(1);
  });
};
