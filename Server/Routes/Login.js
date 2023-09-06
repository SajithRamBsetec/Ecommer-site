const router = require("express").Router()
const user = require("../Controllers/usercontroller")

router.post("/login",user.Login)
module.exports=router;