const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Product = require("./models/product");
const User = require("./models/user");

const port = 3000;
const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

mongoose.connect("mongodb://127.0.0.1:27017/web_mart", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("mongo db connected with the database");
});

app.use(bodyParser.json());
app.post("/add-product", (req, res) => {
  const obj = req.body;
  console.log("Object is ", obj);
  let prod = Product(obj);
  prod
    .save((err, product) => {
      console.log(product);
    })
    .then(() => {
      console.log("product saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/edit-product/:product_id", (req, res) => {
  const id = req.params.product_id;
  let obj = req.body;
  console.log("called edit product!");
  Product.findByIdAndUpdate(id, obj, (err, product) => {
    if (!err) {
      res.json({ message: "Product edited successfully!!" });
    } else res.json({ message: "Failed to edit product!!" });
  });
});

app.post("/signup", (req, res) => {
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

app.post("/login", (req, res) => {
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

app.get("/home", (req, res) => {
  console.log("called /home");
  Product.find((err, product) => {
    if (err) {
      console.log(err);
    } else {
      res.send(product);
    }
  });
});

app.listen(port, "192.168.0.8", () => {
  console.log(`server is running! on port:${port}`);
});
