const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
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

module.exports = mongoose.model('banner', bannerSchema)