const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/assets";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // const renamed = Date.now() + "-" + file.originalname;
    cb(null, file.originalname);
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

//*This below is used to restrict the image size and other document aswell
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "public/assets";

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });

// const limits = {
//   images: { fileSize: 2 * 1024 * 1024 },
//   documents: { fileSize: 5 * 1024 * 1024 },
// };

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.startsWith("image/") &&
//     file.size <= limits.images.fileSize
//   ) {
//     cb(null, true);
//   } else if (
//     (file.mimetype.startsWith("application/") ||
//       file.mimetype === "application/pdf") &&
//     file.size <= limits.documents.fileSize
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Only images (PNG, JPG, JPEG) less than 2MB and documents (PDF, Excel) less than 5MB are allowed"
//       )
//     );
//   }
// };

// const uploadPhoto = multer({
//   storage,
//   limits: limits.documents,
//   fileFilter,
// });

// module.exports = uploadPhoto;
