const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name:{type:String ,required:true},
        brand: {type:String},
        gender: {type:String},
        category: {type: String},
        price: {type: Number},
        is_in_inventory: {type:Boolean},
        items_left: {type:Number},
        imageURL: {type:String},
        slug: {type: String}
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)