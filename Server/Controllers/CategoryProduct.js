const Product = require("../Models/AddProduct");

exports.CategoryProductList=(req,res)=>{
    const {Category}=req.query;
    Product.find({
        $or: [
          { Category: { $regex: Category, $options: 'i' } },
          { Tags: { $elemMatch: { $regex: Category, $options: 'i' } } }
        ]
      }).then((result)=>{
        console.log(result)
        res.json(result)
    })
}
exports.FilteredProduct=(req,res)=>{
  const {FilterData}=req.query
  console.log(FilterData)
  
}