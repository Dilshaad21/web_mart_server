const mongoose = require("mongoose");

const Order = mongoose.Schema({
  p_id: {
    type: String,
  },

  p_name: {
    type: String,
  },

  p_price: {
    type: String,
  },
  
  status: {
    type: String,
  },

  buyerId: {
    type: String,
  },
});

module.exports = mongoose.model("Order", Order);
