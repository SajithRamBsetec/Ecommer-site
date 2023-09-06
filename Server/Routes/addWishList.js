const router=require("express").Router()
const route=require("../Controllers/addWishList")

router.get("/addWishlist",route.WishList)
router.get("/getWishlist",route.getWishlist)
module.exports=router