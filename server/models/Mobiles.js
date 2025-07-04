// const mongoose =require('mongoose')

// const MobileSchema=new mongoose.Schema({
//     model:String,
//     price:Number,
//     brand:String,
//     image:String
// })

// const MobileModel = mongoose.model("mobiles",MobileSchema)
// module.exports = MobileModel


const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
  model: String,
  price: Number,
  brand: String,
  image: String,
});

const MobileModel = mongoose.model('mobiles', MobileSchema);
module.exports = MobileModel;
