//jshint esversion:6

require("dotenv").config({ path: "./.env" });
const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require('connect-flash');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/project_DB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobile: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const homePageTitle = "Welcome to Gaming Application!";
const dicePageTitle = "Dice Game!";
const cardsPageTitle = "Cards Game !";

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("home");
  } else {
    res.render("login", {
      pageTitle: "Gaming Application",
      error: "",
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Gaming Application",
    error : req.flash('error'),
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Register",
    error: "",
  });
});

app.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home", { pageTitle: homePageTitle });
  } else {
    console.log("not Authenticated home!");
    res.redirect("login");
  }
});

app.get("/dice", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dice", { pageTitle: dicePageTitle });
  } else {
    console.log("not Authenticated dice!");
    res.redirect("login");
  }
});

app.get("/cards", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("cards", { pageTitle: cardsPageTitle });
  } else {
    console.log("not Authenticated cards!");
    res.redirect("login");
  }
});

app.get("/success", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("success", { pageTitle: "" });
  } else {
    console.log("not Authenticated success!");
    res.redirect("/register");
  }
});

app.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/register", (req, res) => {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("register", {
    
          pageTitle: "Register",
          error: "A user with given username already registered !",
        });
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("Registered and Authenticated !");
          res.redirect("/success");
        });
      }
    }
  );
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: { type: "error", message: "Invalid username or password." },
  })
);

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
