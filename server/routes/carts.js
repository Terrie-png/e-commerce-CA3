const router = require(`express`).Router()

const cartsModel = require(`..\\models\\carts.js`)
const productsModel = require(`..\\models\\products.js`)
const usersModel = require(`..\\models\\users.js`)
const jwt = require("jsonwebtoken");

// Read All record
router.get(`/carts`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            usersModel.findOne({email:decodedToken.email},(error, user)=> {

                    cartsModel.find({_id:user._id}, (error, data) => {
                        let result = [];
                        console.log(data)
                        data.map((id) =>
                            productsModel.findById(id.productID, (error, cart) => {
                                cart.push(id.quantity);
                                cart.push(id._id);
                                result.push(cart);
                            }))
                        res.json(result);
                    })
                }
            )
        }
    })
})

// Add new record
router.post(`/carts`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if(err)
        {
            res.json({errorMessage:`User is not logged in or User token is expired`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {
                usersModel.findOne({email: decodedToken.email}, (error, user) => {
                    if(error){
                        res.json({errorMessage:error})
                    }else{
                        cartsModel.findOne({productID:req.body.productID,userID:user._id},(error2,result)=>{
                            if(error){
                                console.log(error)
                            } else{
                                if(result != null){
                                    let num = result.quantity + 1;
                                    let item = {quantity: num}
                                    cartsModel.findByIdAndUpdate(result._id, {$set : item}, (error3, res2) =>{
                                        res.json(res2)
                                    })
                                }  else {
                                   cartsModel.create({productID:req.body.productID,userID:user._id,quantity:1},(error4,res3)=>{
                                       res.json(res3)
                                   })
                                }
                            }
                        })
                    }
                })
            }
            else
            {
                res.json({errorMessage:`User is not a customer, so they cannot add new records`})
            }
        }
    })
})


// Update one record
router.put(`/carts/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if(err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            cartsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
            {
                res.json(data)
            })
        }
    })
})


// Delete one record
router.delete(`/carts/:id`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        cartsModel.findByIdAndRemove(req.params.id, (err, result)=>
        {
            res.json(result)
        })
    }
})

module.exports = router