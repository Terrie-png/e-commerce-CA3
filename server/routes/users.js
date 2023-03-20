const router = require(`express`).Router()
const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs');  // needed for password encryption

const jwt = require('jsonwebtoken')

// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 

router.post(`/users/reset_user_collection`, (req,res) =>
{
    usersModel.deleteMany({}, (error, data) => 
    {
        if(data)
        {
            const adminPassword = `test`
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
            {
                if(err){console.log("bad")}
                usersModel.create({name:"Administrator",email:"admin@admin.com",password:hash,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) => 
                {
                    if(createData)
                    {
                        res.json(createData)
                    }
                    else
                    {
                        res.json({errorMessage:`Failed to create Admin user for testing purposes`})
                    }
                })
            })
            
        }
        else
        {
            res.json({errorMessage:`User is not logged in`})
        }
    })      
})
//read all records
router.get(`/users`, (req, res) =>
{
    //user does not have to be logged in to see car details
    usersModel.find((error, data) =>
    {
        res.json(data)
    })
})
//read one record
router.get(`/users/:id`, (req, res) =>
{
    usersModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

// register
router.post(`/users/register/:name/:email/:password`,upload.single("profilePhoto") ,(req,res) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (uniqueError, uniqueData) => 
    {
        if(uniqueData)
        {
            res.json({errorMessage:`User already exists`})
        }
        else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
            {
                usersModel.create({name:req.params.name,email:req.params.email,password:hash}, (error, data) => 
                {
                    if(data)
                    {
                        const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                        // req.session.user = {email: data.email, accessLevel:data.accessLevel}
                        res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                    }
                    else
                    {
                        res.json({errorMessage:`User was not registered`})
                    }
                }) 
            })
        }
    })         
})
 

// login
router.post(`/users/login/:email/:password`, (req,res) =>
{
    usersModel.findOne({email:req.params.email}, (error, data) => 
    {
        if(data)
        {
            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    const token = jwt.sign({email:data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})
                    // req.session.user = {email: data.email, accessLevel:data.accessLevel}
                    res.json({name: data.name,email:data.email, accessLevel:data.accessLevel,token:token})
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        } 
    })
})


router.post(`/users/logout`, (req,res) =>
{
    res.json({})
})

router.delete(`/users/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
        if (err) {
            res.json({errorMessage: `User is not logged in`})
        } else {
            if (decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
                usersModel.findByIdAndRemove(req.params.id, (error, data) => {
                    res.json(data)
                })
            } else {
                res.json({errorMessage: `User is not an administrator, so they cannot delete users`})
            }
        }
    })
})


module.exports = router