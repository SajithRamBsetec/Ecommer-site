const router=require("express").Router()
const route=require("../Controllers/HotNews")
const upload=require("../Middlewares/hotNews")

router.post("/addHotNews",upload.single("file"),route.HotNewsUpload)
router.get("/getOffers",route.GetHotNews)
module.exports=router