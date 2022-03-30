const express = require("express");
const config = require("../aa-app-settings");
const aboutSettings = require("../aa-about-us-content");
const ppSettings = require("../aa-privacy-policy-content");
const termOfUseSettings = require("../aa-page-term-of-use-content");

const pages = express.Router();

//about page
pages.get("/about", (req, res) => {
  res.render("about", {
    config,
    aboutSettings,
  });
});

//privacy-policy page
pages.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", {
    config,
    ppSettings,
  });
});

//term of use page
pages.get("/term-of-use", (req, res) => {
  res.render("term-of-use", {
    config,
    termOfUseSettings,
  });
});

module.exports = pages;
