// Importing the 'jsonwebtoken' library for JWT operations
const jwt = require("jsonwebtoken");

const { secretJWT } = require("../config/config"); // Secret key used to sign and verify JWTs

// Function to generate a JWT token based on user data
function setToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretJWT
  );
}
// Function to verify a JWT token
function verifyUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretJWT);
}
module.exports = { setToken, verifyUser };
