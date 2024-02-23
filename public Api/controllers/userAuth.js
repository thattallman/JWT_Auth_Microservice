const axios = require("axios"); // Importing the axios library for making HTTP requests
const { API_KEY } = require("../config/config");
const { generateApiKey } = require("generate-api-key"); // package to generate API keys
const USERTOKEY = require("../Models/userToKey"); // Importing the USERTOKEY model

// Function to handle user validation from the main service
// and also generation of API Key and storing it to the database
async function handleUserPostDetails(req, res) {
  try {
    const { email, password_hash } = req.body;

    let existingUser;
    try {
      // Finding existing user in the public API database before calling the main service
      existingUser = await USERTOKEY.findOne({
        email: email,
        password_hash: password_hash,
      });
    } catch (error) {
      console.error("Database error:");
      return res.render("home", { error: "Database error" });
    }

    if (existingUser) {
      return res.render("home", {
        name: existingUser.email,
        key: existingUser.apiKey,
      });
    } else {
      try {
        // Making a POST request to the main  to fetch user data since the user is not present
        const response = await axios.post(
          `http://localhost:8001/api/public?api_key=${API_KEY}`,
          {
            email: email,
            password_hash: password_hash,
          }
        );
        const userData = response.data.data[0];
        const userId = userData._id;
        const userEmail = userData.email;
        const api_key = generateApiKey(); // Generating a new API key

        await USERTOKEY.create({ // Creating a new user entry in the database
          email: userEmail,
          userId: userId,
          apiKey: api_key,
          password_hash: userData.password_hash,
        });

        return res.render("home", {
          name: userEmail,
          key: api_key,
        });
      } catch (error) {
        console.error("Error fetching user data:");
        return res.render("home", { error: "User not found" });
      }
    }
  } catch (error) {
    console.error("Error handling user post details:");
    return res.render("home", { error: "An unexpected error occurred" });
  }
}

module.exports = { handleUserPostDetails };
