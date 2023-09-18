const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-login-token");
  if (!token) return res.status(401).send("Access Denied. Empty token.");

  try {
    const decoded = jwt.verify(token, process.env.JWTkey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token.");
  }
};

module.exports = auth;
