const express = require("express");
const router = express.Router();
const Product = require("./models/product");
const Order = require("./models/order");

router.post("/add-product", (req, res) => {
  const obj = req.body;
  console.log("Object is ", obj);
  let prod = Product(obj);
  prod
    .save((err, product) => {
      console.log(product);
    })
    .then((ord) => {
      console.log("product saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/edit-product/:product_id", (req, res) => {
  const id = req.params.product_id;
  let obj = req.body;
  console.log("called edit product!");
  Product.findByIdAndUpdate(id, obj, (err, product) => {
    if (!err) {
      res.json({ message: "Product edited successfully!!" });
    } else res.json({ message: "Failed to edit product!!" });
  });
});

router.post("/order", (req, res) => {
  let order = Order(req.body);

  order
    .save((err, ord) => {
      console.log(ord);
    })
    .then((ord) => {
      console.log("Order placed successfully!");
      res.json({ message: "success" });
    })
    .catch((err) => {
      res.json({ message: "failed" });
    });
});

router.get("/order/:userId", (req, res) => {
  let userId = req.params.userId;

  Order.find({ buyerId: userId, status: "standby" }, (err, order) => {
    res.send(order);
  });
});

router.get("/order/checkout/:userId", (req, res) => {
  let userId = req.params.userId;

  Order.updateMany(
    { buyerId: userId },
    { status: "completed" },
    (err, order) => {
      console.log("Completed!");
    }
  );
  res.send("Checked out");
});
module.exports = router;
