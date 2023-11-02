require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createToken = (id) => {
  return jwt.sign({ id }, '210500', { expiresIn: "1d" });
};
