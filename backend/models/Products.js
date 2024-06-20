const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    photo : {
        type : String,
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    categories : {
        type : Array,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'    
    }
}, {timestamps : true})

module.exports = mongoose.model('Product', ProductSchema);