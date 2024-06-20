const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String
    },
    image:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:false
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('blog', blogSchema)