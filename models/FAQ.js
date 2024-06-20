const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question:{
        type:String,
        unique: true
    },
    answer:{
        type:String,
    }
})

module.exports = mongoose.model('FAQ', faqSchema)