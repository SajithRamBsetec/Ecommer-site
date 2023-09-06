const Register = require("../Models/RegisterModel");
const productModel = require("../Models/AddProduct");

exports.ShowCart = (req, res) => {
    const {userId,ProductId} = req.query;
    if(userId){
    Register.findById(userId)
        .then((user) => {
    

            const Product_Id = user.CartItems.map((item) => item.ProductId);

            productModel.find({ _id: { $in: Product_Id } })
                .then((response) => {
                  
                    res.json(response);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: "Error while fetching products" });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error while fetching user" });
        });
    }
    if(userId==null && ProductId){
        productModel.find({ _id:ProductId})
                .then((response) => {
                  
                    res.json(response);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: "Error while fetching products" });
                });
        }

     
    
};
