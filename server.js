const express = require('express');
const app = express();
const config = require("./config/config.def");

// Config
Object.assign(config, require("./config/config"));
app.set("view engine", "pug");

// Handle requests
app.get("/", function(req, res) {
  res.render("page", {
    title: "Test Page",
    content: "this is a test page. Yadda </strong>Yadda</strong> Yadda"
  });
});

// Start the server
app.listen(config.port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port ${config.port}`);
  }
});
