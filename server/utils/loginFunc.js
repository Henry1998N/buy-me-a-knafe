const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "buyMeAknafehTeamIsOnFire!";
function validateUser(users, email, password) {
  const user = users.find((u) => u.email === email);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return { id: user.id, email: user.email };
}
const generateToken = function (email) {
  const payload = { email };
  return jwt.sign(payload, secretKey);
};

module.exports = { validateUser, generateToken, secretKey };
