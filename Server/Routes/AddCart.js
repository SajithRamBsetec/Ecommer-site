const router=require("express").Router()
const route=require("../Controllers/Addcart")

router.post("/addcart",route.AddCart)

module.exports=router