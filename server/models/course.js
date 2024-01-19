//courseSchema for MongoDB Database

const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course name is required"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  enrollees: [
    {
      userId: {
        type: String,
        required: [true, "UserID is required"],
      },
      enrolledOn: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
