const router = require("express").Router()
const user = require("../Controllers/usercontroller")
const upload=require("../Middlewares/RegisterMulter")

router.post("/register",upload.single("file"),user.Register)

module.exports=router;