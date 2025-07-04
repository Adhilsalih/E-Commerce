const mongoose =require('mongoose')

const BookSchema=new mongoose.Schema({
    book:String,
    price:Number,
    author:String,
    image:String
})

const BookModel = mongoose.model("books",BookSchema)
module.exports = BookModel