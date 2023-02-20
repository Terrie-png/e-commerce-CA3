const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name:{type:String ,required:true},
        brand: {type:String,required:true,enum:["NIKE", "HUSHPUPPIES","ADIDAS","Reebok","Vans"]},
        gender: {type:String,required:true,enum:["MEN","WOMEN","KIDS"]},
        category: {type: String,required:true,enum:["RUNNING", "FOOTBALL","CASUAL","FORMAL"]},
        price: {type: Number,required:true,min:0, max:500},
        is_in_inventory: {type:Boolean,default: false },
        items_left: {type:Number,required:true,min:0},
        imageURL: {type:String ,default:""},
        slug: {type: String,required:true}
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)