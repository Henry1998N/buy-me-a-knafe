const jwt = require("jsonwebtoken");
const loginFunc = require("./loginFunc");
const authenticateUser = function (req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401).send({});
  }
  jwt.verify(token, loginFunc.secretKey, (err, user) => {
    if (err) {
      return res.status(401).send({});
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateUser };
