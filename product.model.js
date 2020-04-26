const mongoose = require("mongoose");

const Product = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", Product);
