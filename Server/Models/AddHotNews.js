const mongoose = require("mongoose");

const hotNews=new mongoose.Schema({
    NewsInfo:String,
    File:String,
    Identification:String,
})

const hotnews=mongoose.model("Hotnews",hotNews)
module.exports=hotnews