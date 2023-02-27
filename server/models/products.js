// const mongoose = require(`mongoose`)

// let productsSchema = new mongoose.Schema(
//     {
//         name:{type:String ,required:true},
//         brand: {type:String,required:true},
//         gender: {type:String,required:true},
//         category: {type: String,required:true},
//         price: {type: Number,required:true,min:0, max:500},
//         is_in_inventory: {type:Boolean,default: false },
//         items_left: {type:Number,required:true,min:0},
//         // imageURL: {type:String ,default:""},
//         slug: {type: String,required:true}
//     },
//     {
//         collection: `products`
//     })

// module.exports = mongoose.model(`products`, productsSchema)
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   image: { type: String, required: true },
// }, {
//   timestamps: true,
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;


const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
   {
            name:{type:String },
            brand: {type:String},
            gender: {type:String},
            category: {type: String},
            price: {type: Number},
            is_in_inventory: {type:Boolean},
            items_left: {type:Number},
            imageURL: {type:String ,default:""},
            slug: {type: String}
        
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsSchema)