const CANDIDATE = require("../models/candidates"); // Importing the Candidate model

// Function to handle POST request to create a candidate
async function handlePostCandidate(req, res) {
  try {
    const { first_name, last_name, email } = req.body;
    await CANDIDATE.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      user_id: req.user_id,  // user_id is available in the request
    });
    console.log("Successfully Updated the Candidate ");
    res.render("home"); 
  } catch (error) {
    console.log("Key already exist  ");
    res.render("home", { duplicateError: "email has already been used " }); // email has a unique type in the schema 
  }
}

// Function to handle GET request to fetch candidates
async function handleGetCandidates(req, res) {
  const candidates = await CANDIDATE.find({ user_id: req.user_id });
  if (!candidates)
    return res.render("home", { noCandidates: "No candidates are there yet " });
  else {
    return res.render("home", { candidateData: candidates });
  }
}
module.exports = { handlePostCandidate, handleGetCandidates };
