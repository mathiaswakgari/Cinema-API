const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Cinema");
});
app.get("/api/movies", (req, res) => {
  res.send([
    { id: 1, title: "movie One" },
    { id: 2, title: "movie Two" },
    { id: 3, title: "movie Three" },
  ]);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
