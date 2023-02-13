const router = require(`express`).Router()

const productsModel = require(`..\\models\\product.js`)



// read all records
router.get(`/products`, (req, res) =>
{
    //user does not have to be logged in to see car details
    productsModel.find((error, data) =>
    {
        res.json(data)
    })
})



// Read one record
router.get(`/products/:id`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        carsModel.findById(req.params.id, (error, data) =>
        {
            res.json(data)
        })
    }
})

// Add new record
router.post(`/products`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel !== `undefined` && req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            productsModel.create(req.body, (error, data) =>
            {
                res.json(data)
            })
        }
        else
        {
            res.json({errorMessage:`User is not an administrator, so they cannot add new records`})
        }
    }
})


// Update one record
router.put(`/products/:id`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
        {
            res.json(data)
        })
    }
})


// Delete one record
router.delete(`/products/:id`, (req, res) =>
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            productsModel.findByIdAndRemove(req.params.id, (error, data) =>
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