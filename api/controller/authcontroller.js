const bcrypt = require("bcryptjs")
const Admin = require('../model/adminmodel')


let salt = bcrypt.genSaltSync(10)

exports.register=async(req,res,next)=>{

    const { username,  password} = req.body
    if(username===null  || password===null ){
        let error=("Some of the required fields are empty")
        return next(error)
        }
    try {
        const admin = await Admin.create({ username,  password: bcrypt.hashSync(password, salt) })
        res.status(201).json({ data: {admin}, message: "user registered successfully",token:await admin.generateToken()})
    }
    catch (err) {res.status(400).json({ message: err.message})
    }
}

exports.login= async (req, res) => {

    const { username, password } = req.body;

   try{ let admin = await Admin.findOne({ username })
   if(!admin){
    return res.status(400).json({"msg":"invalid credentials"})
   }
    const passOk = await admin.comparepassword(password)
    if (passOk) {
       res.status(200).json({"message":"login sucessful",
        token:await admin.generateToken()
       })
    } else {
        res.status(400).json('Incorrect password')
    } }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

exports.user=async(req,res)=>{
 try{
    const userData=req.user;
    console.log(userData);
    return res.status(200).json(userData)
 }
 catch(err){
    res.status(401).json(err.message)
 }
}



