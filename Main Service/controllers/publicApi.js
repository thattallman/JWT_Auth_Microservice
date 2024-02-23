// Importing the User and Candidate models
const USER = require("../models/user");
const CANDIDATE = require("../models/candidates");

// Function to handle POST request for user authentication
async function handleGetUserAuth(req, res) {
  const { email, password_hash } = req.body;
  try {
     // Finding user data based on email and password_hash
    const data = await USER.find({
      email: email,
      password_hash: password_hash,
    });
    if (data.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// Function to handle POST request to create a candidate via public API
async function handlePostPublicCandidate(req, res) {
  try {
    const { first_name, last_name, email } = req.body;
    await CANDIDATE.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      user_id: req.headers["user_id"],  // user_id is provided in headers
    });
    console.log("Successfully Updated the Candidate ");
    return res.json({ success: "Updated successfully " });
  } catch (error) {
    return res.json({ 409: "Email already existing" });
  }
}

// Function to handle GET request to fetch candidates via public API
async function handleGetPublicCandidate(req, res) {
  const candidates = await CANDIDATE.find({ user_id: req.headers["user_id"] });
  if (candidates.length === 0) return res.json({ empty: "No candidates yet" });
  else {
    return res.json(candidates);
  }
}
module.exports = {
  handleGetUserAuth,
  handlePostPublicCandidate,
  handleGetPublicCandidate,
};
