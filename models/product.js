const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    images: [{
      type: String,
    }],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    price: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    stock: {
      type: Number,
      default: 1
    },
    isFeatured:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product",productSchema)
