const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

//get all users
router.route("/").get(UserController.getAllUser);

//register a user
router.route("/").post(UserController.registerUser);

//update a user
router.route("/:id").put(UserController.updateUser);

//login user
router.route("/login").post(UserController.loginUser);

// enroll user
router.route("/enroll").post(UserController.enrollUser);

//findUserByEmail
router.route("/details").post(UserController.findUser);

//findUserById
router.route("/:id").get(UserController.findUserById);

module.exports = router;
