const mongoose = require(`mongoose`)

let cartsSchema = new mongoose.Schema(
    {
        userID:{type:String,required:true},
        productID:{type:String, required: true},
        quantity:{type:Number , default:1}
    },
    {
        collection: `carts`
    })

module.exports = mongoose.model(`carts`, cartsSchema)