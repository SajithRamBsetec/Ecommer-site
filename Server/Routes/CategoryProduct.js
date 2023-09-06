const router=require("express").Router()
const route=require("../Controllers/CategoryProduct")

router.get("/CategoryProductList",route.CategoryProductList)
router.get("/ApplyFilters",route.FilteredProduct)
module.exports=router