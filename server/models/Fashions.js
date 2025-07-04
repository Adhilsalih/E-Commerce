const mongoose =require('mongoose')

const FashionSchema=new mongoose.Schema({
    item:String,
    price:Number,
    quantity:String,
    image:String
})

const FashionModel = mongoose.model("fashions",FashionSchema)
module.exports = FashionModel