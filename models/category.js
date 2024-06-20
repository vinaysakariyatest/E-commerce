const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, "Category already exists"]
    }
})

module.exports = mongoose.model('category', categorySchema)