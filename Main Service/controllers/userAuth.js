// Importing the User model and the setToken function from the JWT auth service
const USER = require("../models/user");
const { setToken } = require("../services/auth");

// Function to handle POST request for user registration
async function handleUserPost(req, res) {
  try {
    const { first_name, last_name, email, password_hash } = req.body;
    await USER.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password_hash,
    });
    res.redirect("/api/login"); // Redirecting to the login page after successful registration
  } catch (error) {
    console.log("User already Exist");
    res.render("register", { errorRegister: "Email already registered " }); // Email has a unique type 
  }
}
// Function to handle POST request for user login
async function handleLogin(req, res) {
  const { email, password_hash } = req.body;
  const user = await USER.findOne({
    email: email,
    password_hash: password_hash,
  });
  if (user) {
    const token = setToken(user); // Generating token for authentication
    res.cookie("token", token);
    res.redirect("/api/protected");
  } else {
    res.render("Login");  // Rendering login page if user not found
  }
}

module.exports = { handleUserPost, handleLogin };
