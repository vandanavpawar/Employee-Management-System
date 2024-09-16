const mongoose = require('mongoose')
const jwt =require('jsonwebtoken')
const bcrypt = require("bcryptjs")


const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

adminSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            username:this.username
        },
        process.env.SECRET_KEY,{}
        )
    }catch(err){
     console.log(err);
    }
}
adminSchema.methods.comparepassword=async function(password){
    try{
        return bcrypt.compare(password,this.password)
    }catch(err){
        console.log(err);
    }
}

const Admin = mongoose.model('admin',adminSchema)

module.exports = Admin