const express = require("express");
const router = express();

//Role controller
const { AddRole } = require("../controllers/AddingRole");

//User Controllers
const { welcome, addUser } = require("../controllers/UserController");

// uploadPhoto --Middleware--
const uploadPhoto = require("../middleware/uploadPhoto");

router.get("/", welcome);

//Role Route
router.post("/role", AddRole);
// router.post("/addUser", addUser);
router.post("/addUser", uploadPhoto.single("profileImage"), addUser);

module.exports = router;
