const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Generate a JWT token for a user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const user = (req) => {
  return req.user;
};

module.exports = { generateToken, hashPassword, verifyToken, user };