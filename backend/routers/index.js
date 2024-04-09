const express = require("express");
const router = express();

//Role controller
const { AddRole } = require("../controllers/AddingRole");

//User Controllers
const {
  welcome,
  addUser,
  loginUser,
} = require("../controllers/UserController");

//Category Controllers
const { listCategory } = require("../controllers/CategoryController");

// uploadPhoto --Middleware--
const uploadPhoto = require("../middleware/uploadPhoto");
// authentication --Middleware
const { verifyToken } = require("../middleware/authentication");

router.get("/", welcome);

//Role Route
router.post("/role", AddRole);
// router.post("/addUser", addUser);
router.post("/addUser", uploadPhoto.single("profileImage"), addUser);
router.post("/login", loginUser);
router.get("/list", verifyToken, listCategory);

module.exports = router;
