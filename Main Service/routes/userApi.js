const express = require("express");
const router = express.Router();
const { handleUserPost, handleLogin } = require("../controllers/userAuth");
const { handleJWTToken } = require("../Middlewares/auth");

router.post("/register", handleUserPost);

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("Login");
});

router.get("/protected", handleJWTToken, (req, res) => res.render("home"));

router.post("/login", handleLogin);

module.exports = router;
