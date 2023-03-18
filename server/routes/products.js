const router = require(`express`).Router()

const jwt = require('jsonwebtoken')
const {data} = require("express-session/session/cookie");

let products = require('../jsonformatter.json');

const productsModel = require('../models/products');

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest:`${process.env.UPLOADED_FILES_FOLDER}`})
const emptyFolder = require('empty-folder')
//reset productd db
router.get(`/resetDB` , (req,res)=>
{

    productsModel.deleteMany({},(error,none)=>{
        if(none) {
            products.map((product) => {
                productsModel.create(product, (err, data) => {
                    if (err) {
                        res.json(err)
                    } else {
                        emptyFolder(process.env.UPLOADED_FILES_FOLDER,false, (result)=>
                        {
                            res.json(data)
                        })
                    }
                })

            })
        }
    })
})


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
// router.get(`/products/:id`, (req, res) =>
// {
//     jwt.verify(req.header.authorization, process.env.JWT_PRIVATE_KEY, {algorithm:"HS256"},(err,decodedToken) =>{
//         if(err){
//             res.json({errorMessage: `User is not logged in`})
//         } else{
//             productsModel.findById(req.params.id, (error, data) =>
//             {
//                 res.json(data)
//             })
//         }
//     })
// })
//-read-one-record-raveena
router.get(`/products/:id`, (req, res) =>
{
    productsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

// Add new record
router.post(`/products/add`, (req, res) => {
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                productsModel.create(req.body, (error,data) =>
                {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not an administrator, so they cannot add new records`})
            }
        }
    })
})

//update-raveena
router.put(`/products/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
                res.json(data)
            })
        }
    })
})

// Delete one record
//delete-raveena
router.delete(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                productsModel.findByIdAndRemove(req.params.id, (error, data) => {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not an administrator, so they cannot delete records`})
            }
        }
    })
})

module.exports = router