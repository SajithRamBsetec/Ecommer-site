const Product = require("../Models/AddProduct");

exports.CategoryBunch=(req,res)=>{
    let BuncherData=[]
    let Categorydata
    let goin=0
   Product.distinct("Category").then((result)=>{

Categorydata=result
Product.find({Category:{$in:result}}).sort({Views:-1}).then((result)=>{

    Categorydata.forEach(category => {
        goin=0;
        result.map((item)=>{
if(item.Category==category && goin==0){
    BuncherData.push({Category:category,
    Image:item.Image})
goin=1
}
        })
    });

    res.json(BuncherData)
   }

   )


})
}