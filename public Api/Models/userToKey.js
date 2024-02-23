const mongoose = require("mongoose");
// schema for storig user and its respective key 
const userKeySchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
});
const USERTOKEY = mongoose.model("userToKey", userKeySchema);

module.exports = USERTOKEY;
