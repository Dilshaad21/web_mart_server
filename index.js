const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Product = require("./product.model");

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/web_mart", {
  useNewUrlParser: true,
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
    .save()
    .then(() => {
      console.log("new product is added!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Hello");
});

app.get("/home", (req, res) => {
  console.log("called /home");
  Product.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.listen(port, "192.168.0.8", () => {
  console.log(`server is running! on port:${port}`);
});
