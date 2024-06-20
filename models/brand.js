const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, "Category already exists"]
    },
    logo:{
        type:String,
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('brand', brandSchema)