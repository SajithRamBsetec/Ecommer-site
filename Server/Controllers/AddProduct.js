const Product = require("../Models/AddProduct");
const redis = require('../Middlewares/Redis');
exports.AddProduct = async (req, res) => { 

 
    const { category,variety,brand,productName, price, description, Tags, specifications } = req.body;


    const specImages = req.files.map(item => item.filename);

    const tagsArray = JSON.parse(Tags);

    var Tag=[]
tagsArray.map((item)=>{
Tag.push(item.text)
})
console.log(Tag)


    const specificationsArray = JSON.parse(specifications);


  
    try {
        const productDetails = new Product({
            Category: category,
            Variety:variety,
            Brand:brand,
            ProductName:productName,
            Price: price,
            Description: description,
            Tags: Tag,
            Specifications: specificationsArray,
            Image:specImages[0],
            SpecImages: specImages
        });
        await productDetails.save();
        res.status(201).json("Product added successfully");
        redis.del("Products")
    } catch (error) {
        res.status(500).json("Unable to add product");
    }
};
