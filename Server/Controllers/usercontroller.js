const Register=require("../Models/RegisterModel")


exports.Register=(req,res)=>{
    const { name, email, password, date } = req.body;
    const file= req.file.filename;
const Registeration=Register({
    Name:name,
    Email:email,
    DateOfBirth:date,
    Password:password,
    File:file,
})
Registeration.save().then((result) => {
    res.json(result);
  })
  .catch((error) => {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Something went wrong during registration" });
  });
}


//Login
exports.Login=(req, res) => {
    const { email, password } = req.body;
    
    Register.find({ Email: email, Password: password })
        .then((result) => {
            console.log(result);
            if (result.length > 0) {
                
                res.json(result);
              
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "An error occurred" });
        });
}

