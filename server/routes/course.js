const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");
const auth = require("../utils/auth");

//get all courses
router.route("/").get(CourseController.getAllCourses);

//get course by id
router.route("/:id").get(CourseController.getCourseById);

//add course
router.route("/").post(CourseController.addCourse);

//update course
router.route("/:id").put(CourseController.updateCourse);

//delete course
router.route("/:id").delete(CourseController.deleteCourse);

module.exports = router;
