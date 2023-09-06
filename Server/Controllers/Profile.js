const Register=require("../Models/RegisterModel")

exports.Profile=(req,res)=>{
    console.log(req.body)
const userId=req.body.userId
Register.findById(userId).then((result)=>{
    res.json(result)}).catch((err)=>{console.log("there is error in Profile")})
}