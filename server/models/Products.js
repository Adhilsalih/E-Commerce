const mongoose =require('mongoose')

const ProductSchema=new mongoose.Schema({
    product:String,
    price:Number,
    brand:String,
    image:String
})

const ProductModel = mongoose.model("products",ProductSchema)
module.exports = ProductModel