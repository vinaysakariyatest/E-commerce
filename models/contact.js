const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    company_name:{
        type:String,
    },
    email:{
        type:String,
    },
    contact:{
        type:Number,
    },
    address:{
        type:String
    }
});

module.exports = mongoose.model("contact",contactSchema)