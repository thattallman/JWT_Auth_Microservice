const { verifyUser } = require("../services/auth");// verifyUser verifies the JWT token 

// Middleware function to handle JWT token verification
function handleJWTToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) res.render("Login");
  else {
    const verify = verifyUser(token);
    if (!verify) res.render("Home");
    else {
        const _id = verify._id;
   
        req.user_id = _id;
       
      next();
    }
  }
}

module.exports = { handleJWTToken };


