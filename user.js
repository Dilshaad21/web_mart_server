const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

router.post("/signup", (req, res) => {
  var password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  User.find({ email: req.body.email }).then(() => {
    console.log("can create user with email: ", req.body.email);
    const us = { email: req.body.email, password: password };
    const user = User(us);
    user
      .save((err, u) => {
        console.log("Successfully inserted user!!");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  res.status(201);
  res.send("Success");
});

router.post("/login", (req, res) => {
  var password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  User.find({ email: req.body.email, password: password })
    .then(() => {
      console.log("User found!");
      var payload = {
        email: req.body.email,
      };
      var token = jwt.sign(payload, KEY, {
        algorithm: "HS256",
        expiresIn: "15d",
      });
      console.log("Success");
      res.send(token);
    })
    .catch((err) => {
      console.log("Could not find the user", err);
      res.status(401);
    });
});

module.exports = router;
