const router = require("express").Router()
const route = require("../Controllers/Profile")

router.post("/profile",route.Profile)

module.exports=router;