const router = require(`express`).Router()

const cartsModel = require(`..\\models\\carts.js`)
const productsModel = require(`..\\models\\products.js`)
const usersModel = require(`..\\models\\users.js`)

// Read one record
router.get(`/carts/:id`, (req, res) =>
{
    console.log('test')
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
         cartsModel.findById(req.params.id, (error,data) =>
         {
            let result = [];
            data.map((id) =>
                productsModel.findById(id.productID,(error, cart)=>
                {
                    cart.push(id.quantity);
                    result.push(cart);
                }))

            res.json(result);
         })
    }
})

// Add new record
router.post(`/carts`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel !== `undefined` && req.session.user.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER) {

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


// Update one record
router.put(`/carts/:id/:productID`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
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


// Delete one record
router.delete(`/carts/:id`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            cartsModel.findByIdAndRemove(req.params.id, (error, data) =>
            {
                res.json(data)
            })
        }
        else
        {
            res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
        }
    }
})

module.exports = router