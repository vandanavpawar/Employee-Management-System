const express = require('express')
const authcontroller=require('../controller/authcontroller')
const authmiddleware=require('../middleware/authmiddleware')

const router=express.Router()

router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
router.get('/user',authmiddleware.authentication,authcontroller.user)


module.exports=router
