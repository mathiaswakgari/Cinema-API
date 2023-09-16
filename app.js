const express = require("express");
require("dotenv").config();
const app = express();

require("./startup/logging")();
require("./startup/db")();
require("./startup/configuration")(app);
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
