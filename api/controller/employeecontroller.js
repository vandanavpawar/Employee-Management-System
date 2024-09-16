const Employee = require('../model/employemodel')

exports.createEmployee = async(req,res)=>{
        try {
           // const body = req.body;
       // const profileImage = req?.file ? req?.file?.path : null;
       // body.profileImage = profileImage;
            let employee = await Employee.create(req.body)
            //console.log(body);
            res.status(200).json({employee,message:"employee created sucessfully"})
        } catch (err) {
            res.status(401).json({status: "fail",message: err.message})
            console.log(err.message);
            
        }
    }

    exports.employeelist= async (req, res) => {
        const employee = await Employee.find()
        try {
            res.status(200).json({length:employee.length,employee})
        }
        catch (err) {
            res.status(404).json({  status: "fail", message: err.message})
        }
    }
    exports.getemployee=async(req,res)=>{
        try{
            const id =req.params.id;
            let employee =await Employee.findOne({_id:id});
            return res.status(200).json(employee)
        }catch(err){
            next(err)
        }
    }

    exports.updateemployee=async(req,res)=>{
        try{
            const id =req.params.id;
            const data=req.body;
            let employee =await Employee.updateOne({_id:id},{$set:data});
            return res.status(200).json({employee,message:"updated sucessfully"})
        }catch(err){
            next(err)
        }
    }

    exports.deleteemplyee=async(req,res)=>{  
    try{
        let id=req.params.id
        await Employee.deleteOne({_id:id})
   return res.status(200).json("Deleted")
    }catch(err){
        next(err)
    }
    }
     