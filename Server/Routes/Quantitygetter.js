const router = require("express").Router()
const user = require("../Controllers/Quantitygetter")


router.get("/getQuantity",user.getQuantity)

module.exports=router;