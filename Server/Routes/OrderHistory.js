const router=require("express").Router()
const route=require("../Controllers/OrderHistory")

router.post("/StoreOrderHistory",route.StoreOrderHistory)
router.get("/getOrderHistory",route.getOrderList)
router.get("/getCount",route.getCount)
module.exports=router