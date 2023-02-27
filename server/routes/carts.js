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
            usersModel.find(decodedToken.email,(error, user)=>
                cartsModel.find(user._id, (error, data) => {
                    let result = [];
                    data.map((id) =>
                        productsModel.findById(id.productID, (error, cart) => {
                            cart.push(id.quantity);
                            cart.push(id._id);
                            result.push(cart);
                        }))

                    res.json(result);
                })
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
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {
                usersModel.findOne({email: req.session.user.email}, (error, user) => {
                    req.body.userID = user._id
                    cartsModel.create(req.body, (error, data) => {
                        res.json(data)
                    })
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