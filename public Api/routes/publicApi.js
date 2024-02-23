const express = require("express");
const { handleUserPostDetails } = require("../controllers/userAuth");
const { handleGetCandidate, handlePostCandidate } = require("../controllers/condidate");
const router = express.Router();
const {validateAPIKey} = require('../Middlewares/apiKeyAuth')

router.get("/auth", (req, res) => {
  res.render("home");
});
router.post("/", handleUserPostDetails);
router.get("/candidate",validateAPIKey, handleGetCandidate);
router.post("/profile", handlePostCandidate)


module.exports = router;
