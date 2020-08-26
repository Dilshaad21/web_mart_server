const mongoose = require("mongoose");

const Product = mongoose.Schema({
  name: {
    type: String,
  },
  sellerId: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", Product);
