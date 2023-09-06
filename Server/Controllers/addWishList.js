const User = require("../Models/RegisterModel");
const Product=require("../Models/AddProduct")


exports.WishList=(req,res)=>{
   const {ImageId,UserId}=req.query
    console.log(req.query)
    User.findById(UserId).then((result)=>{
        const ifexist=result.WishList.find(item=>item.ProductId==ImageId)
        if(ifexist){
            console.log("wishlist already exists")
        }
        else{
            result.WishList.push({ProductId:ImageId})
        }
        return result.save().then((ok)=>{
            res.json(ok)
        })
       
    }).then(
       
        console.log("Wishlist Sucessfully added")
    ).catch((err)=>{
        console.log("error"+err)
    })
}

exports.getWishlist=(req,res)=>{
const userId=req.query.userId

User.findById(userId).then((result)=>{
    const ProductIds=result.WishList.map(item=>item.ProductId)
    console.log(ProductIds)
    Product.find({_id:{$in:ProductIds}}).then((result)=>
    {
        res.json(result)
    console.log(result)
    })
})
}