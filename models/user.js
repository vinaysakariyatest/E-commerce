const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    contact: {
      type: Number,
      unique: true,
    },
    token:{
      type:String
    },
    role:{
      type: mongoose.Types.ObjectId,
      ref: "role"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
