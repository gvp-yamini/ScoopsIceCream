const mongoose = require('mongoose');
var Schema = mongoose.Schema
var conn =mongoose.Collection;
var Schema = mongoose.Schema

var categorySchema =new mongoose.Schema({
	name: String,
	details: String,
	isDeleted: {type:Boolean,default:false},
	created_at: {type:Date, required:true, default:Date.now}
});

var categoryModel = mongoose.model('category', categorySchema);
module.exports=categoryModel;