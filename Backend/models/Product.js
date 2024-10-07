const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{type: String , required: true },
    category:{type:String , required: true , enum:['Electronics', 'Books', 'Clothing',   'Beauty']},
    brand:{type:String , required:true},
    price:{type:Number , required: true},
    stock : {type: Number},
    userID:{type: mongoose.Schema.Types.ObjectId , ref:'User', required:true}
},{versionKey:false});

const ProductModel = mongoose.model('Product' , ProductSchema);

module.exports = ProductModel