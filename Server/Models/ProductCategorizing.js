const mongoose = require("mongoose");

const ProductCategorizing = new mongoose.Schema({
    Category: String,
    Variety:[String],
    Brand:[String],
    SpecificationKeys:[String],
    
});

const ProductCategories = mongoose.model("ProductFilters",ProductCategorizing);

module.exports = ProductCategories;
