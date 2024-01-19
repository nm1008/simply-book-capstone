const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const verifyAuth = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;

    //removes the "bearer " and leaving the accessToken
    token = token.slice(7, token.length);

    let result = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, data) => {
        if (err) {
          return res.status(403).json({ message: "auth failed.." });
        } else {
          return data;
        }
      }
    );

    if (result) {
      console.log("success");
      next;
    } else {
      res.status(401).json({ auth: "failed" });
    }
  } else {
    res.status(400).json({ auth: "failed" });
  }
};

module.exports = {
  createAccessToken,
  verifyAuth,
};
