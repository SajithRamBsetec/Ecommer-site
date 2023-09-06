const router=require("express").Router()
const route=require("../Controllers/ShowCart")

router.get("/ShowCart",route.ShowCart)

module.exports=router