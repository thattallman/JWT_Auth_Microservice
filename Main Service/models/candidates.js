const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// candidate schema 
const candidateSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CANDIDATE = mongoose.model("Candidate", candidateSchema);
module.exports = CANDIDATE;
