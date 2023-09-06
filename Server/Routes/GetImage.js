const router=require("express").Router()
const route=require("../Controllers/getImage")

router.get("/getImage",route.getImage)
module.exports=router