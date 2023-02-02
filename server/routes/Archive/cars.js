const router = require(`express`).Router()

const carsModel = require(`../models/Archive/cars`)


// read all records
router.get(`/cars`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    carsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/cars/:id`, (req, res) => 
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
router.post(`/cars`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel !== `undefined` && req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            carsModel.create(req.body, (error, data) => 
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
router.put(`/cars/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        carsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
        {
            res.json(data)
        })        
    }
})


// Delete one record
router.delete(`/cars/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            carsModel.findByIdAndRemove(req.params.id, (error, data) => 
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