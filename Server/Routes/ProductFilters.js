const router=require("express").Router()
const route=require("../Controllers/ProductFilters")

router.post("/AddProductFilters",route.AddCategory)
router.get("/getCategoryData",route.getCategoryData)
module.exports=router

