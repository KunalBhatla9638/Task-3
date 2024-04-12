const multer = require("multer");
const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "public/assets";

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     // const renamed = Date.now() + "-" + file.originalname;
//     cb(null, file.originalname);
//   },
// });

// const limits = {
//   fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
// };

// const uploadPhoto = multer({
//   storage,
//   limits,
// });

// module.exports = uploadPhoto;

// Define storage destination and filename function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/assets";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Define file size limits and file type filter
const limits = {
  images: { fileSize: 2 * 1024 * 1024 }, // Limit image file size to 2MB
  documents: { fileSize: 5 * 1024 * 1024 }, // Limit document file size to 5MB
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") &&
    file.size <= limits.images.fileSize
  ) {
    cb(null, true); // Allow images less than or equal to 2MB
  } else if (
    (file.mimetype.startsWith("application/") ||
      file.mimetype === "application/pdf") &&
    file.size <= limits.documents.fileSize
  ) {
    cb(null, true); // Allow documents less than or equal to 5MB
  } else {
    cb(
      new Error(
        "Only images (PNG, JPG, JPEG) less than 2MB and documents (PDF, Excel) less than 5MB are allowed"
      )
    );
  }
};

// Create multer instance for both image and document uploads
const uploadPhoto = multer({
  storage,
  limits: limits.documents, // Set default limit to document limit (5MB)
  fileFilter,
});

module.exports = uploadPhoto;
