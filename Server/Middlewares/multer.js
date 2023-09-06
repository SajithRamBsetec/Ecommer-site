const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Uploads/Images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Use multer to handle multiple file input fields
const upload = multer({ storage }); // "files" is the name attribute of the file input

module.exports = upload;
