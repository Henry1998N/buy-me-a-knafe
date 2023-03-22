const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "buyMeAknafehTeamIsOnFire!";
const axios = require("axios");
const Grantee = require("../models/granteesModel");

const getGrantees = async function () {
  return Grantee.find({}).then((grantees) => {
    return grantees;
  });
};
async function validateUser(email, password) {
  const grantees = await getGrantees();
  const user = grantees.find((u) => u.email === email);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return { id: user.id, email: user.email, name: user.firstName };
}
const generateToken = function (email, id, name) {
  const payload = { email, id, name };
  return jwt.sign(payload, secretKey);
};

module.exports = { validateUser, generateToken, secretKey };
