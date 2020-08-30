const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

router.post("/signup", async (req, res) => {
  var password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user);
    if (user.length) {
      res.json({ user: user, message: "User cannot be created!" });
    } else {
      const usr = User({ email: req.body.email, password: password });
      try {
        const userRes = await usr.save();
        res.json({ user: userRes, message: "User created!" });
      } catch (err) {
        res.send(err);
      }
    }
  } catch (err) {
    console.log("error occured!", err);
    res.send(err);
  }
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
