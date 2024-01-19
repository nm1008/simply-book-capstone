// Import the Course model from the specified file.
const Course = require("../models/course");

// Import the 'auth' module from the specified file.
const auth = require("../utils/auth");

// Define a function to get all courses.
const getAllCourses = async (req, res) => {
  try {
    // Retrieve all courses from the database.
    const courses = await Course.find();
    
    // Check if there are no courses or the array is empty.
    return !courses || courses.length === 0
      ? res.status(404).json({ message: "No courses available" }) // Return a 404 response with a message.
      : res.status(200).json(courses); // Return a 200 response with the list of courses.
  } catch (err) {
    // Handle any errors that occur during the process.
    res.status(500).json({ message: err.message }); // Return a 500 response with the error message.
  }
};

// Define a function to get a course by its ID.
const getCourseById = async (req, res) => {
  try {
    // Find a course by its ID from the database.
    const courseId = await Course.findById(req.params.id);
    
    // Check if the course with the given ID is not found.
    return !courseId
      ? res.status(404).json({ message: "Course not found" }) // Return a 404 response with a message.
      : res.status(200).json(courseId); // Return a 200 response with the found course.
  } catch (err) {
    // Handle any errors that occur during the process.
    res.status(500).json({ message: err.message }); // Return a 500 response with the error message.
  }
};

// Define a function to add a new course.
const addCourse = async (req, res) => {
  try {
    // Verify if there is a valid authentication token.
    auth.verifyAuth(req);

    // Create a new course in the database using the request body.
    const addedCourse = await Course.create(req.body);

    // Return a 201 response indicating successful creation.
    res.status(201).json(addedCourse);
  } catch (err) {
    // Handle any errors that occur during the process.
    res.status(500).json({ message: err.message }); // Return a 500 response with the error message.
  }
};

// Define a function to update a course by its ID.
const updateCourse = async (req, res) => {
  try {
    // Verify if there is a valid authentication token.
    auth.verifyAuth(req);

    // Extract the 'id' parameter from the request.
    const { id } = req.params;

    // Find and update a course by its ID with the data from the request body.
    const course = await Course.findByIdAndUpdate(id, req.body);

    // Check if the course with the given ID is not found.
    if (!course) {
      return res
        .status(404)
        .json({ message: `Cannot find course with ID ${id}` }); // Return a 404 response with a message.
    }

    // Find the updated course to return as a response.
    const updatedCourse = await Course.findByIdAndUpdate(id);

    // Return a 200 response with the updated course.
    res.status(200).json(updatedCourse);
  } catch (err) {
    // Handle any errors that occur during the process.
    res.status(500).json({ message: err.message }); // Return a 500 response with the error message.
  }
};

// Define a function to delete a course by its ID.
const deleteCourse = async (req, res) => {
  try {
    // Verify if there is a valid authentication token.
    auth.verifyAuth(req);

    // Find and delete a course by its ID from the database.
    const course = await Course.findByIdAndDelete(req.params.id);

    // Check if the course with the given ID is not found.
    if (!course) {
      return res
        .status(404)
        .json({ message: `Cannot find the course ID ${req.params.id}` }); // Return a 404 response with a message.
    } else {
      // Return a 200 response with the deleted course.
      return res.status(200).json(course);
    }
  } catch (err) {
    // Handle any errors that occur during the process.
    res.status(500).json({ message: err.message }); // Return a 500 response with the error message.
  }
};

// Export the defined functions to be used in other parts of the application.
module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
