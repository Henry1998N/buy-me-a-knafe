const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Supporter = require("./supporterModel");

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
  supporters: [{ type: Schema.Types.ObjectId, ref: "Supporter" }],
  password: String,
  quote: String,
  favorite: [{ type: Schema.Types.ObjectId, ref: "Grantee" }],
});
const Grantee = mongoose.model("Grantee", granteeSchema);
module.exports = Grantee;
