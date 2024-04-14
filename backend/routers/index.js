const express = require("express");

const router = express();

//Role controller
const { AddRole } = require("../controllers/AddingRole");

//Email Controller
const { emailHandler } = require("../controllers/EmailController");

//User Controllers
const {
  welcome,
  addUser,
  loginUser,
} = require("../controllers/UserController");

//Category Controllers
const {
  listCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

//Products Controllers
const {
  listProducts,
  listProductByUser,
  addProducts,
  searchProducts,
  updateProducts,
  deleteProducts,
  deleteParticularImage,
} = require("../controllers/ProductControllers");

// uploadPhoto --Middleware--
const uploadPhoto = require("../middleware/uploadPhoto");
// authentication --Middleware
const { verifyToken } = require("../middleware/authentication");

// require("../controllers/CronController");

//Welcome Route
router.get("/", welcome);
//Role Route
router.post("/role", AddRole);

//User common Route
router.post("/addUser", uploadPhoto.single("profileImage"), addUser);
router.post("/login", loginUser);

//Category Route
router.get("/list", verifyToken, listCategory);
router.get("/listProductByUser", verifyToken, listProductByUser);
router.post("/addCategory", verifyToken, addCategory);
router.patch("/updateCategory/:id", verifyToken, updateCategory);
router.delete("/deleteCategory/:id", verifyToken, deleteCategory);

// Products Route
router.get("/products", verifyToken, listProducts);
router.post(
  "/addProducts",
  uploadPhoto.array("productImages", 12),
  verifyToken,
  addProducts
);
router.post("/searchProducts", verifyToken, searchProducts);
router.patch(
  "/updateProduct/:id",
  uploadPhoto.array("productImages", 12),
  verifyToken,
  updateProducts
);
router.delete("/deleteProduct/:id", verifyToken, deleteProducts);
router.patch("/deleteImage/:id", verifyToken, deleteParticularImage);

//Email Handler
router.post(
  "/sendEmail",
  uploadPhoto.single("uploadedFile"),
  verifyToken,
  emailHandler
);

// (async () => {
//   try {
//     await cronMail();
//     console.log("Started");
//   } catch (error) {
//     console.error("Error starting cron job:", error.message);
//   }
// })();

module.exports = router;
