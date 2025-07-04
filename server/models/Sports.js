const mongoose =require('mongoose')

const SportSchema=new mongoose.Schema({
    item:String,
    price:Number,
    brand:String,
    image:String
})

const SportModel = mongoose.model("sports",SportSchema)
module.exports = SportModel