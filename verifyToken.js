const jwt = require("jsonwebtoken");

const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";

module.exports = function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  try {
    if (!token) {
      res.status(401).send("Access denied!");
    } else {
      const userid = jwt.verify(token, KEY);
      req.user = userid;
      console.log("LOGGED in successfully");
      next();
    }
  } catch (err) {
    res.send(err);
  }
};
