const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body : {
        type : String,
        required : true
    },
    product : { 
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Product'
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('Comment', CommentSchema);