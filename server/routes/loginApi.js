const express = require("express");
const router = express.Router();
const loginFunctions = require("../utils/loginFunc");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  // const users = [
  //   { email: "henry@gmail.com", password: bcrypt.hashSync("123", salt) },
  // ];
  const isValidUser = loginFunctions.validateUser(email, password);
  isValidUser.then((result) => {
    if (result) {
      const jwt = loginFunctions.generateToken(email, result.id, result.name);
      res.status(200).json({ token: jwt });
    } else {
      res.status(401).send({ message: "Failure" });
    }
  });
});

module.exports = router;
