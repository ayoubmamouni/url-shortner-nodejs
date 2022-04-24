const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const str = require("@supercharge/strings");
const config = require("./aa-app-settings");
const ShortURL = require("./model/shortSchema");

const app = express();
//in development mode, We dont need (dotenv & morgan) modules in production mode!
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const logger = require("morgan");
  app.use(logger("dev"));
}

//connected to mongodb with mongoose
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDb"))
  .catch((err) => console.error(err));

//setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//use body parser - To read informations from clinet
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Render pages only if navbar is enabled// if showNavbar is 'false' a user can access to any page in website. like privacy-policy or contact page etc...
if (config.showNavbar) {
  //routers/ pages
  //contact page route
  app.use("/pages", require("./routers/pages"));
}

app.use("/admin", require("./admin/admin"));
//Get home page
app.get("/", async (req, res) => {
  try {
    const GetUrls = await ShortURL.find({});
    const counter = await GetUrls.length;
    const urls = await ShortURL.find({
      showInPublicLinks: true, //get only public links
    })
      .sort({
        postedOn: -1,
      })
      .limit(config.maxLength_PublicLinks);
    res.render("home", {
      data: urls,
      config,
      counter,
    });
  } catch (err) {
    res
      .status(500)
      .send("OOPs, We have a problem in our server. Please try again.");
  }
});

//robots .txt for stupid search engines..
app.get("/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/robots.txt");
});

//On post full URL
app.post("/", async (req, res) => {
  let userFullURL = req.body.fullURL.toLowerCase();
  let error = false;
  let textError;

  if (!config.allow_to_short_shorterURL) {
    if (userFullURL.length <= config.allow_to_short_shorterURL_Number_Length) {
      textError = config.user_full_URL_is_already_shorter_message;
      error = true;
    }
  }

  if (!config.allows_user_to_create_URL) {
    return res.json({
      msg: "error-url-not-supported",
      txt: config.when_create_a_URL_is_disabled_message,
    });
  }
  if (!config.user_can_Add_Adults_Link) {
    for (let i = 0; i < config.links_Not_Supported.length; i++) {
      const linkDoesntSupported = await userFullURL.match(
        config.links_Not_Supported[i]
      );
      if (linkDoesntSupported != null) {
        textError = config.when_user_add_unsupported_URL_message;
        error = true;
        break;
      }
    }
  }
  //if error is true
  if (error) {
    return res.json({
      msg: "error-url-not-supported",
      txt: textError,
    });
  }
  //A user can change type of url to text from inspect elements in browser, So we will return Error..
  let findProtocolInURL =
    (await userFullURL.match("http")) || userFullURL.match("HTTP");
  if (findProtocolInURL === null || findProtocolInURL.index !== 0) {
    return res.json({
      msg: "error",
      txt: config.when_user_post_text_not_URL,
      icon: "error",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3100,
    });
  }

  //  A user can send us nothing from url input,
  //  We did the same in client side but user can make any change in front-end code and he can send us nothing
  //  so this code wil return error message
  if (userFullURL === "" || userFullURL === undefined) {
    return res.json({
      msg: "error",
      txt: config.when_user_post_nothing_message,
      icon: "error",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //if eveything ok ..
  // You can change the value to any number
  let randomTXT = str.random(config.RandomText_length);

  const short_URL = async (shortRandomTxt) => {
    const data = {
      showInPublicLinks: req.body.showInPublicLinks,
      fullURL: req.body.fullURL,
      shortURL: shortRandomTxt,
    };
    const newURL = await ShortURL.create(data);
    res.json({
      msg: config.link_created_successful_message,
      icon: "success",
      btnTxt: "copy to clipboard",
      showCancelButton: true,
      showConfirmButton: true,
      timer: 1500,
      id: newURL._id,
      fullURL: newURL.fullURL,
      short_URL: newURL.shortURL,
      views: newURL.views,
      time: newURL.postedOn.toLocaleDateString(),
    });
  };

  //check if there an existing short url already in db
  const checkExistURL = await ShortURL.findOne({
    shortURL: randomTXT,
  });
  //if No short URL already in db
  if (
    checkExistURL === undefined ||
    checkExistURL === null ||
    checkExistURL === ""
  ) {
    short_URL(randomTXT);
  }
  // if short URL is already in db, so lets generate new rndm txt
  else {
    newRandomTXT = str.random(config.RandomText_length + 1);
    short_URL(newRandomTXT);
  }
});

//get shortUrl
app.get("/:id", async (req, res) => {
  try {
    const result = await ShortURL.findOne({
      shortURL: req.params.id,
    });
    //if no shortURL return to home page
    if (result == null) {
      return res.status(404).render("Not-Found", {
        config,
      });
    }
    //if not equal null, then add +1 to views of short URL
    await result.views++;
    //then save
    await result.save();
    //and redirect to full url
    res.redirect(result.fullURL);
  } catch (err) {}
});

//when a user clicks on 'refresh' button on recent URL
app.get("/checkNewClicks/:id", async (req, res) => {
  const result = await ShortURL.findOne({
    shortURL: req.params.id,
  });
  if (result == null) {
    return res.render("Not-Found", {
      config,
    });
  }
  res.json(result);
});

//Get recent url
app.get("/getRecentURL/:id", async (req, res) => {
  const recentURL = await ShortURL.findById(req.params.id);
  if (recentURL == null) {
    return res.json({
      message: config.recent_URL_Not_found_message,
    });
  }
  res.json({
    showInPublicLinks: recentURL.showInPublicLinks,
    fullURL: recentURL.fullURL,
    short_URL: recentURL.shortURL,
    views: recentURL.views,
    date: recentURL.postedOn.toLocaleDateString(),
  });
});

//Update user Link
app.put("/updateRecentURL/:id", async (req, res) => {
  let recentURL_id = req.params.id;
  let userUpdate = req.body.showInPublicLinks;
  const updateRecentURL = await ShortURL.findByIdAndUpdate(recentURL_id, {
    showInPublicLinks: userUpdate,
  });
  if (updateRecentURL == null) {
    return res.redirect("/");
  }
  res.json({
    msg: config.link_updated_successful_message,
  });
});

// //handle 404 errors
app.use((req, res, next) => {
  return res.status(404).render("Not-Found", {
    config,
  });
});

// let port =  process.env.PORT || 3000
// app.listen(port, () => console.log(`Server started at ${port}`))
module.exports = app;
