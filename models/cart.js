const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Types.ObjectId,
        ref:"product"
    },
    price:{
        type:Number
    },
    qty:{
        type: Number,
        default: 1
    },
    total:{
        type: Number
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model("cart",cartSchema)