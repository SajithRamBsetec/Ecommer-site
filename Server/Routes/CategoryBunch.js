const router=require("express").Router()
const route=require("../Controllers/CategoryBunch")

router.get("/getCategoryBunch",route.CategoryBunch)

module.exports=router