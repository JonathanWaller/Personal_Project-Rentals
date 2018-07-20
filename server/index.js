require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const path = require("path");

// bringing in controllers
const { strat, logout } = require(`${__dirname}/controllers/authCtrl`);

const {
  getAllProperties,
  addProperty,
  addImage,
  deleteProperty,
  updateProperty,
  addUploadImage,
  getProperty
} = require(`${__dirname}/controllers/propertyCtrl`);

const {
  addReview,
  getReviews
} = require(`${__dirname}/controllers/reviewCtrl`);

const { getAvgRating } = require(`${__dirname}/controllers/ratingCtrl`);
// const { addRating } = require(`${__dirname}/controllers/ratingCtrl`);
const {
  addFavorite,
  getFavorites,
  deleteFavorite
} = require(`${__dirname}/controllers/favoritesCtrl`);

const app = express();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  return app.set("db", dbInstance);
});

app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(strat);

passport.serializeUser((user, done) => {
  // console.log(user);
  const db = app.get("db");
  db.getUserByAuthid([user.id])
    .then(response => {
      console.log(response);
      if (!response[0]) {
        console.log(response);
        db.addUserByAuthid([
          user.displayName,
          user.id,
          user.picture,
          user.emails[0].value
        ])
          .then(res => done(null, res[0]))
          .catch(console.log);
      } else return done(null, response[0]);
    })
    .catch(console.log);
});

passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    successRedirect: "http://localhost:3000/#/",
    // successRedirect: "/api/me",
    failureRedirect: "/login"
    // successRedirect: "/"
  })
);

authenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({
      message: "Not Logged In"
    });
  }
};

app.get("/api/me", authenticated, (req, res, next) => {
  //should below be 'send(user)'?? that's how steven's was
  res.status(200).send(req.user);
});

app.get("/logout", logout);

//properties
app.get("/api/properties", getAllProperties);
app.get("/api/property/:id", getProperty);
app.post("/api/property", addProperty);
// app.post("/api/image", addImage);
app.delete("/api/property/:id", deleteProperty);
app.put("/api/property/:id", updateProperty);

//reviews
app.post("/api/review", addReview);
app.get("/api/reviews", getReviews);

//avg ratings
// app.post("/api/rating", addRating);
app.get("/api/rating", getAvgRating);

//favorites
app.post("/api/favorite", addFavorite);
app.get("/api/favorites/:id", getFavorites);
app.delete("/api/favorite/:id", deleteFavorite);

//need for uploading from Firebase
app.post("/api/addUploadImg", addUploadImage);

// for build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
