const router=require("express").Router()
const route=require("../Controllers/LiveOrderHistory")


router.post("/SaveLiveOrders",route.LiveOrderDetailStoring)
router.get("/RetreiveLiveOrders",route.getLiveOrders)

module.exports=router