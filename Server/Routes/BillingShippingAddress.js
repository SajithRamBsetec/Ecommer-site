const router=require("express").Router()
const route=require("../Controllers/BillingShippingAddress")

router.post("/ShippingAddress",route.BillingShippingAddress)
router.post("/BillingAddress",route.BillingShippingAddress)
router.get("/getBillingShippingDetails",route.getBillingShippingDetails)
module.exports=router