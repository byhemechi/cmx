const express = require('express');
const app = express();
const config = require("./config/config.def.json");

Object.assign(config, require("./config/config.json"))

app.listen(config.port, function(err) {
  if (!err) {
    console.log("Server running on port " + config.port)
  }
});
