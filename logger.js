const EventEmitter = require("events");

class Logger extends EventEmitter {
  log = (message) => {
    console.log(message);
    this.emit("messageLogged", { message: message });
  };
}
module.exports = Logger;
