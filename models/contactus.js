const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    contact:{
        type:Number,
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model("contactus",contactUsSchema)