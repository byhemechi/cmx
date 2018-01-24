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
  var pdath = path.join(__dirname, "pages", req.url.replace(/\/$/, "/index.html"));

  console.log(pdath);
  if (pdath.match(/\.html$/i)) {
    fs.readFile(pdath, "utf-8", function(err, data) {
      var title = data.match(/<\? (.*?) \?>/i);
      var titleindex = 1;

      if (err) {
        res.render("error");
      } else {

        res.render("page", {
          title: title && title[titleindex] ? title[titleindex] : "untitled",
          content: data
        });
      }
    });
  } else {
    res.sendFile(pdath);
  }
});
app.use("/", express.static(path.join(__dirname, "pages")));

// Start the server
app.listen(config.port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port ${config.port}`);
  }
});
