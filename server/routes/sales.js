const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const productModel = require(`../models/products`)
const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");
const usersModel = require(`../models/users`)
const {toJSON} = require("express-session/session/cookie");
const cartsModel = require(`../models/carts`)
const createNewSaleDocument = (req, res, next) =>
{

    // Use the PayPal details to create a new sale document
    let saleDetails = {}
    saleDetails.paypalPaymentID = req.params.paymentID
    // saleDetails.carID = req.params.carID
    saleDetails.price = req.params.price
    let token
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            usersModel.findOne({email:decodedToken.email},(error, userData)=>
            {
                if(error || userData.length === 0){
                    res.json({errorMessage:error})
                } else {
                    cartsModel.deleteMany({userID:userData._id}, (err, data) =>{
                        if(err){
                            console.log(err)
                            return next(err)
                        }
                    })
                }
            })
            token = decodedToken
        }
    })
    // unable to escape the value from the query scope
    // var myDoc = usersModel.findOne({email:token.email},(error, user)=> {return user})

    saleDetails.customerEmail = token.email
    console.log('test')
    let arr = []
    for(let i = 0; i < req.body.data.length; i++){
        arr.push(req.body.data[i]._id)
    }
    saleDetails.productID = arr

    req.body.data.map((product) =>
        productModel.findOne({_id:product._id}, (err, data) =>
        {
            if(data){
                data.items_left = parseInt(data.items_left) - parseInt(product.quantity)
                data.save((err, data) => {
                    if(err){
                        console.log(err)
                        return next(err)
                    }
                })
            } else {
                console.log(err)
                return next(err)
            }
        })
    )

    // Remove the cart items

    salesModel.create(saleDetails, (err, data) =>
    {
        if(err)
        {

            console.log(err)
            return next(err)
        }
    })

    console.log(next)
    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:price', createNewSaleDocument)


module.exports = router