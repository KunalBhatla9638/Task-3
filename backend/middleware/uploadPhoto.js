const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination");
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const renamed = Date.now() + "-" + file.originalname;
    cb(null, renamed);
    console.log(file);
  },
});

const limits = {
  fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
};

const uploadPhoto = multer({
  storage,
  limits,
});

module.exports = uploadPhoto;
