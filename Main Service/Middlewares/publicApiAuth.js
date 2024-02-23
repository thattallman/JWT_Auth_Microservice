// Importing the API_KEY from the configuration file
const { API_KEY } = require("../config/config");

// Middleware function to verify the public API key between the main service and the public API 
// for secure communication 
function verifyPublicApiKey(req, res, next) {
  const key = req.query.api_key;
  if (key === API_KEY) {
    console.log("successfully Authenticated the API Key  ");
    next();
  } else {
    console.log("Invalid Key ");
    res.send(401).json({ error: "Unauthorized" });
  }
}

module.exports = { verifyPublicApiKey };
