const mongoose = require(`mongoose`)

let cartsSchema = new mongoose.Schema(
    {
        userID:{type:Number,required:true},
        productID:{type:Number, required: true},
        quantity:{type:Number , default:1}
    },
    {
        collection: `carts`
    })

module.exports = mongoose.model(`carts`, cartsSchema)