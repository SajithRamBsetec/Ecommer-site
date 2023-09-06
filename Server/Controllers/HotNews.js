const hotnews=require("../Models/AddHotNews")


exports.HotNewsUpload=(req,res)=>{
    const {newsInfo,identification}=req.body
const file=req.file.filename
console.log(req.body)
const Hotnews=hotnews({
    NewsInfo:newsInfo,
    File:file,
    Identification:identification
})
Hotnews.save().then((result)=>{
    res.json(result)
})
.catch(err=>{
    console.log("error : "+err)
})
}

exports.GetHotNews=(req,res)=>{
    hotnews.find().then((result)=>
    {res.json(result)
})
}