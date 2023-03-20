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
});

const Grantee = mongoose.model("Grantee", granteeSchema);

module.exports = Grantee;
