const express = require('express');
const app = express();
const config = require("./config/config.def");
const fs = require('fs');
const path = require('path');
const Remarkable = require('remarkable');
const md = new Remarkable();
const fm = require('front-matter');

// Config
Object.assign(config, require("./config/config"));
app.set("view engine", "pug");

// Routing
app.use("/assets", express.static(path.join(__dirname, "build")));
app.use("/assets", express.static(path.join(__dirname, "client")));

// Handle requests
app.use("/", function(req, res) {
  var pdath = path.join(__dirname, "pages", req.url.replace(/\/$/, "/index.md"));
  var isRender = pdath.match(/\.html$/i) || pdath.match(/\.md$/i);

  console.log(pdath);
  if (path.extname(pdath) && isRender) {
    fs.readFile(pdath, "utf-8", function(err, value) {
      var data = {};

      if (err) {
        res.render("error");
      } else {
        data = fm(value);
        if (path.extname(pdath).toLowerCase() === ".md") {
          console.log(path.extname(pdath));
          data.body = md.render(data.body);
        }
        res.render("page", {
          title: data.attributes.title,
          description: data.attributes.description,
          tags: data.attributes.tags,
          content: data.body.replace(/---/g, "<!--\n$1\n-->")
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
