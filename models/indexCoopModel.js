const mongoose = require("mongoose");

const tokenMarketSchema = new mongoose.Schema({
  tokenAddress: {
    type: String,
    required: true,
  },
  price_history: [
    {
      timestamp: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("TokenMarketData", tokenMarketSchema);
