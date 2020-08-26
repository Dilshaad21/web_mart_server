const express  = require('express');
const router  = express.Router();
const Product = require("./models/product");

router.post("/add-product", (req, res) => {
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

module.exports = router;
