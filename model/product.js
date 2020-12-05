const mongoose = require('mongoose');
var Schema = mongoose.Schema
var conn =mongoose.Collection;
var Schema = mongoose.Schema

var productSchema =new mongoose.Schema({

    product: {type:String, required:true},
    details: String,
    price: {type:Number, required:true},
    images: [String],
    category: String,
    isDeleted: {type:Boolean,default:false},
    created_at: {type:Date, required:true, default:Date.now}

});

var productModel = mongoose.model('product', productSchema);
module.exports=productModel;