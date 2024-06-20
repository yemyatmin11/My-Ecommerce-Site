const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    items : {
        type : Array,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        default : "Product Processing"
    },
    date : {
        type : Date,
        default : new Date()
    },
    payment : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Order', OrderSchema);