const express = require('express');
const app = express();
const config = require("./config/config.def");
const fs = require('fs');
const path = require('path');

// Config
Object.assign(config, require("./config/config"));
app.set("view engine", "pug");

// Routing
app.use("/assets", express.static(path.join(__dirname, "build")));
app.use("/assets", express.static(path.join(__dirname, "client")));

// Handle requests
app.use("/", function(req, res) {
  fs.readFile(`${path.join(__dirname, "/pages/", req.url.replace(/^\/$/, "home.md").replace(/\/$/, ""))}`, "utf-8", function(err, data) {
    if (err) {
      res.render("error");
    } else {
      res.render("page", {
        title: "test",
        content: data
      });
    }
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
