require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const { strat } = require(`${__dirname}/controllers/authCtrl`);
// const strat = require("./controllers/authCtrl");

const app = express();

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  //   console.log(dbInstance);
  return app.set("db", dbInstance);
});

app.use(json());
app.use(cors());

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
// passport.use(auth0Strategy);

//check if issues
passport.serializeUser((user, done) => {
  console.log(user);
//   const db = app.get("db");
//   db.getUserByAuthid([user.id]).then(response => {
//     if (!response[0]) {
//       db.addUserByAuthid();
//     }
//   });
// });

passport.deserializeUser((user, done) => {});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/api/me",
    failureRedirect: "/login"
    // connection: "github"
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
  //should below be 'send(req.user)'??
  res.status(200).send(user);
});

//end check if issues

//test
// app.get("/api/test", (req, res) => {
//   app
//     .get("db")
//     .houses.find({})
//     .then(response => res.status(200).json(response));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
