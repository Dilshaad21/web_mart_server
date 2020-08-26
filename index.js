const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Product = require("./models/product");
const userRoutes = require("./user");
const productRoutes = require("./product");

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/web_mart", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("mongo db connected with the database");
});

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use("/product", productRoutes);

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

app.listen(port, "localhost", () => {
  console.log(`server is running! on port:${port}`);
});
