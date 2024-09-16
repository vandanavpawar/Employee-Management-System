const express = require('express')
const employeecontroller=require('../controller/employeecontroller')
const  {cloudinaryFileUploader}=require('../middleware/fileuploader')
const { authentication } = require('../middleware/authmiddleware')
const router=express.Router()


router.get('/employeelist',employeecontroller.employeelist)
router.post('/createemployee',authentication,employeecontroller.createEmployee)
router.get('/getemployee/:id',employeecontroller.getemployee)
router.patch('/updateemployee/:id',employeecontroller.updateemployee)
router.delete('/deleteemployee/:id',employeecontroller.deleteemplyee)

module.exports=router