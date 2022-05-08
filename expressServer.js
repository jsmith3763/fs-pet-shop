const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 5556;

app.get("/pets", (req, res) => {
  fs.readFile("pets.json", "utf8", function (err, petsJson) {
    if (err) {
      res.status(404).send("Not found");
    }
    res.status(200).send(petsJson);
  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf8", function (err, petsJson) {
    if (err) {
      res.status(404).send("Not found");
    }
    const pets = JSON.parse(petsJson);
    if (pets[req.params.id]) {
      res.status(200).send(pets[req.params.id]);
    } else {
      res.status(404).send("Not found");
    }
  });
});

app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
});
