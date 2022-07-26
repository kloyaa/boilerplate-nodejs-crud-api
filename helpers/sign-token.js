const jwt = require("jsonwebtoken");

const signToken = (key, secret, expiry) => {
  return jwt.sign({ data: key }, secret, { expiresIn: expiry });
};

module.exports = signToken;
