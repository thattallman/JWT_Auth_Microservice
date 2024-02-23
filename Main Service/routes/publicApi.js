const express = require("express");
const router = express.Router();
const {
  handleGetUserAuth,
  handlePostPublicCandidate,
  handleGetPublicCandidate,
} = require("../controllers/publicApi");
router.post("/", handleGetUserAuth);

router.post("/profile", handlePostPublicCandidate);
router.get("/candidate", handleGetPublicCandidate);
module.exports = router;
