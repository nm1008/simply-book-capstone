const User = require("../models/user");
const Course = require("../models/course");

//bcrypt to hash passwords (check registerUser)
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");

//get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//register a user
const registerUser = async (req, res) => {
  try {
    //bcrypt - generate salt and hash the user's password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userEmailExists = await User.findOne({ email: req.body.email });

    if (userEmailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //create a new user with the hashed password
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      password: hashedPassword,
      // or what we can do is bcrypt.hashSync(req.body.password, 10) // 10 is salt
    });

    //save the newUser to the DB
    const registeredUser = await newUser.save();

    //response
    res.status(200).json(registerUser);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//findUser By ID
const findUserById = async (req, res) => {
  try {
    const findUserById = await User.findById(req.params.id);
    res.status(200).json(findUserById);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//find user by Email
const findUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    res.status(200).json(findUser);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//update user info
const updateUser = async (req, res) => {
  try {
    auth.verifyAuth(req);

    const { id } = req.params;
    const userId = await User.findByIdAndUpdate(id, req.body);

    if (!userId) {
      return res
        .status(404)
        .json({ message: `Cannot find user with ID ${id}` });
    }

    const updatedUser = await User.findByIdAndUpdate(id);
    res.status(200).json(updatedUser);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//log-in user
const loginUser = async (req, res) => {
  try {
    const userDetails = await User.findOne({ email: req.body.email });

    if (!userDetails) {
      return res.send("Incorrect information");
    }

    let comparePasswordResult = await bcrypt.compare(
      req.body.password,
      userDetails.password
    );

    if (!comparePasswordResult) {
      return res.send("Incorrect information");
    } else {
      res.send({ accessToken: auth.createAccessToken(userDetails) });
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//enroll user
const enrollUser = async (req, res) => {
  try {
    auth.verifyAuth(req);

    const findUser = await User.findOne({ email: req.body.email });
    const findCourse = await Course.findOne({ name: req.body.name });

    if (!findUser || !findCourse) {
      return res.status(400).json("User or course not found");
    }

    const isEnrolled = findUser.enrollments.some((enrollment) => {
      return enrollment.courseId.toString() === findCourse._id.toString();
    });

    if (isEnrolled) {
      return res.status(400).json("User already enrolled");
    }

    findUser.enrollments.push({ courseId: findCourse._id });
    findCourse.enrollees.push({ userId: findUser._id });

    await findUser.save();
    await findCourse.save();

    return res.status(201).json("User enrolled");
  } catch (err) {
    // Handle any errors
    // console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//exporting variables to routes folder
module.exports = {
  getAllUser,
  registerUser,
  findUser,
  findUserById,
  updateUser,
  loginUser,
  enrollUser,
};
