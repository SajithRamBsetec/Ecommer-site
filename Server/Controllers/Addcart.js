const Register = require("../Models/RegisterModel");


exports.AddCart = (req, res) => {
    console.log(req.body);
    const { userId, productId, quantity,mode} = req.body;
  if(mode=="add"){
    Register.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }


            const existingCartItem = user.CartItems.find(item=>item.ProductId==productId);

            if (existingCartItem) {
                    existingCartItem.Quantity = quantity;
            } else {

             
                user.CartItems.push({ ProductId: productId, Quantity: quantity });
            }
            return user.save();
        
        })
        .then(() => {
            res.json({ message: "Cart updated successfully" });
        })
        .catch(error => {
            console.error("Error updating cart:", error.message);
            res.status(500).json({ error: "An error occurred while updating the cart" });
        });
    }
    
    if(mode=="delete"){
        Register.findOne({ _id: userId })
            .then(user => {
              
                    user.CartItems.pull({ ProductId: productId});
                
                return user.save();
            
            })
            .then(() => {
                res.json({ message: "Cart updated successfully" });
            })
            .catch(error => {
                console.error("Error updating cart:", error.message);
                res.status(500).json({ error: "An error occurred while updating the cart" });
            });
        }
};
