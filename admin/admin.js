const admin = require("express").Router();
const path = require("path");
const ShortURL = require("../model/shortSchema");

// delete a link
admin.delete("/delete", async (req, res) => {
  let id = await req.body.id;
  const Link = await ShortURL.findByIdAndDelete(id);
  if (!Link) {
    return res.json({
      msg: "Link Not found!",
      deleted: false,
    });
  }
  res.json({
    msg: "Successfully link deleted",
    deleted: true,
    id,
  });
});

admin.get("/login", (req, res) => {
  let loginFile = path.join(__dirname + "../../public/adminLogin.html");
  res.sendFile(loginFile);
});

admin.post("/login", async (req, res) => {
  let userKey = await req.body.Userkey;
  let username = await req.body.adminUsername;
  let password = await req.body.adminPassword;
  let adminUsername = await process.env.ADMINUSERNAME;
  let adminpassword = await process.env.ADMINPASSWORD;
  let login = false;

  const URLs = await ShortURL.find({})
    .sort({
      postedOn: -1,
    })
    .limit(30);

  if (userKey == process.env.KEY) {
    return res.json({
      success: true,
      URLs,
    });
  }

  if (username === adminUsername && password === adminpassword) {
    login = true;
  }
  if (login) {
    res.json({
      success: true,
      key: process.env.KEY,
      URLs,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

module.exports = admin;
