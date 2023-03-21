const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Supporter = require("./supporterModel");

mongoose
  .connect("mongodb://127.0.0.1:27017/buyMeAknafehDB", {
    useNewUrlParser: true,
  })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));
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
});

const Grantee = mongoose.model("Grantee", granteeSchema);

module.exports = Grantee;
