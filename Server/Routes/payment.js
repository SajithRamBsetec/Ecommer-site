const router=require("express").Router()
const route=require("../Controllers/Payment")

router.post("/payment",route.Payment)
module.exports=router
