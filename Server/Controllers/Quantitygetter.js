const Register = require("../Models/RegisterModel");

exports.getQuantity = (req, res) => {
    const {userId,receive} = req.query;
    if(userId){
    Register.findById(userId)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error while fetching user" });
        });
    }


     
    
};
