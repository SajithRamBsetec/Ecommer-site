const Register=require("../Models/RegisterModel")


exports.BillingShippingAddress=(req,res)=>{
    const {Name,ContactNo,Address,City,Zipcode,State,Country,Save,UserId}=req.body
    
 
const options = {
    upsert: true, // Insert if document doesn't exist
    new: true // Return the updated document after the update
  };
    if(Save=="BillingAddress"){
        Register.updateOne({_id:UserId},{$set:{'BillingAddress.Address':Address,'BillingAddress.City':City,
    'BillingAddress.ZipCode':Zipcode,'BillingAddress.State':State,'BillingAddress.Country':Country},options})
    .then((result)=>{res.status(200).json()})
    }

if(Save=="ShippingAddress"){
  
        Register.updateOne({_id:UserId},{$set:{'ShippingAddress.Name':Name,'ShippingAddress.ContactNo':ContactNo,'ShippingAddress.Address':Address,'ShippingAddress.City':City,
    'ShippingAddress.ZipCode':Zipcode,'ShippingAddress.State':State,'ShippingAddress.Country':Country},options}).then((result)=>{
        res.status(200).json()
    })
}
}

exports.getBillingShippingDetails=(req,res)=>{
    const UserID=req.query.UserID

    Register.findById(UserID).then((result)=>{

    res.json(result)}).catch(err=>"somthing is error")
}