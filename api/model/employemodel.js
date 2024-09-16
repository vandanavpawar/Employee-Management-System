const mongoose = require('mongoose')

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Enter the name"]
    },
    email:{
        type: String,
        required: [true, "Enter the email"],
        unique: [true, "This email id already exists"],
        trim: true,
        lowercase: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
        ]
    },
    mobileno:{
        type:Number,
        unique:true,
        min: 10,
       
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:[String],
        required:true
    },
    profileImage : [],

},{
    timestamps:true
})

const Employee=mongoose.model('Employee',employeeSchema)

module.exports=Employee