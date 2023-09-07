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
app.get("/api/movies/:id", (req, res) => {
  res.send(req.params);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
