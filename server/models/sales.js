const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
    {
        paypalPaymentID: {type: String, required:true},
        productID: {type: Array, required:true},
        price: {type: Number, required:true},
        customerEmail: {type: String,required:true}
    },
    {
        collection: `sales`
    })

module.exports = mongoose.model(`sales`, salesSchema)