const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const granteeSchema = new Schema({
  firstName: String,
  lastName: String,
  picture: String,
  description: String,
  aboutMe: String,
  city: String,
  country: String,
  balance: Number,
  email: String,
  supporters: [],
<<<<<<< HEAD
=======
  hi: [],
>>>>>>> majd-branch
});

const Grantee = mongoose.model("grantee", granteeSchema);

module.exports = Grantee;
