const  mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName:{
        type: String,
        unique: true,
    },
    permissions:{
        type: [String],
    }
})

module.exports = mongoose.model("role",roleSchema);