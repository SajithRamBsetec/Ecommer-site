const Product = require("../Models/ProductCategorizing");

exports.AddCategory = (req, res) => {
    const { Category, Data, Adding } = req.body;

    if (Adding === "Category") {
        Product.findOne({ Category: Data })
            .then(result => {
                if (result) {
                    return res.status(400).json({ message: "Category already exists." });
                }

                Product.create({ Category: Data })
                    .then(result => {
                        res.status(201).json(result);
                    })
                    .catch(err => {
                        console.error("Error:", err);
                        res.status(500).json({ message: "Internal server error." });
                    });
            })
            .catch(err => {
                console.error("Error:", err);
                res.status(500).json({ message: "Internal server error." });
            });
    } else if (Adding === "Variety") {
        Product.updateOne(
            { Category: Category.value },
            { $addToSet: { Variety: Data } }, // $addToSet ensures uniqueness
            { upsert: true }
        )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error("Error:", err);
                res.status(500).json({ message: "Internal server error." });
            });
    } 

    else if (Adding === "Brand") {
        Product.updateOne(
            { Category: Category.value },
            { $addToSet: { Brand: Data } }, // $addToSet ensures uniqueness
            { upsert: true }
        )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error("Error:", err);
                res.status(500).json({ message: "Internal server error." });
            });
    } 
    else if (Adding === "Specification") {
        Product.updateOne(
            { Category: Category.value },
            { $addToSet: { SpecificationKeys: Data } }, // $addToSet ensures uniqueness
            { upsert: true }
        )
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error("Error:", err);
                res.status(500).json({ message: "Internal server error." });
            });
    } 
};

exports.getCategoryData=(req,res)=>{
    console.log(req.query)
    const {Category}=req.query
    Product.find().then((result)=>{
        console.log(result)
        res.json(result)
    })

}