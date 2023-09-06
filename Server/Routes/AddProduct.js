const express = require("express");
const router = express.Router();
const multerUpload = require("../Middlewares/multer"); // Adjust the path
const productController = require("../Controllers/AddProduct"); // Adjust the path

// Route to add a product
router.post("/addProduct", multerUpload.array("files"), productController.AddProduct);

module.exports = router;
