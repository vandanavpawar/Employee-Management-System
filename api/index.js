const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv=require('dotenv')
const authroutes=require('./routes/authroutes')
const employeeroutes=require('./routes/employeeroutes')
const bodyParser=require('body-parser')


const app=express()
app.use(express.json())
app.use(bodyParser.json());

dotenv.config({path:'./.env'})

app.use(cors({credentials:true,origin:'http://localhost:5173'}))

mongoose.connect(process.env.CONN_STR).then(() => {
    console.log("Db connected");
}).catch((err) => {
    console.log(err);
})

app.use('/app/v1',authroutes)
app.use('/app/v1/employee',employeeroutes)


app.listen(8000, () => {
    console.log("server created");
})