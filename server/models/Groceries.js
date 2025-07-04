const mongoose =require('mongoose')

const GrocerySchema=new mongoose.Schema({
    item:String,
    price:Number,
    quantity:String,
    image:String
})

const GroceryModel = mongoose.model("groceries",GrocerySchema)
module.exports = GroceryModel