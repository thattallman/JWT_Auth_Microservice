const USERTOKEY = require("../Models/userToKey");

// Middleware function to validate users API key
async function validateAPIKey(req, res, next) {
  const apiKey = req.query.api_key;
  const user = await USERTOKEY.findOne({ apiKey: apiKey });
  if (user) {
    next();
  } else {
    return res.status(401).json({ error: "Invalid API key" });
  }
}

module.exports = {validateAPIKey}
