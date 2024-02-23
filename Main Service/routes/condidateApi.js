const express = require("express");
const router = express.Router();
const {
  handlePostCandidate,
  handleGetCandidates,
} = require("../controllers/condidates");

router.post("/", handlePostCandidate);

router.get("/", handleGetCandidates);

module.exports = router;
