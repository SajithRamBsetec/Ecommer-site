const router=require("express").Router()
const route=require("../Controllers/Addcart")

router.post("/deleteCart",route.deleteCart)
module.exports=router