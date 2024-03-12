const USERTOKEY = require("../Models/userToKey");
const axios = require("axios");
const { API_KEY } = require(`../config/config`);

// Handler function to get candidate data
async function handleGetCandidate(req, res) {
  try {
    const apiKey = req.query.api_key;  // Extracting the API key from the query parameters
    const user = await USERTOKEY.findOne({ apiKey: apiKey });
     // Making a GET request to fetch candidate data from the  main service 
    const response = await axios.get(
      `http://mainservicenet:8001/api/public/candidate?api_key=${API_KEY} `,
      {
        headers: {
          user_id: user.userId,  // Passing the user's ID as a header 
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching candidate data:");
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Handler function to post candidate data
async function handlePostCandidate(req, res) {
  try {
    const apiKey = req.query.api_key;
    const user = await USERTOKEY.findOne({ apiKey: apiKey });

    const { first_name, last_name, email } = req.body;

    // Making a POST request to add candidate data to main service 
    const response = await axios.post(
      `http://mainservicenet:8001/api/public/profile?api_key=${API_KEY} `,
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
      {
        headers: {
          user_id: user.userId,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching candidate data:");
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleGetCandidate, handlePostCandidate };
