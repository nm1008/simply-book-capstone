const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "https://capstone-mern-front.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://capstone-mern-front.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// Other headers
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// PORT
const PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.json());
app.use(cors(corsOptions));

// connecting to MongoDB database and listening to port
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
const courseRoutes = require("./routes/course");
app.use("/api/courses", courseRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
