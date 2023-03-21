const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supporterSchema = new Schema({
  name: String,
  amount: Number,
  message: String,
  picture: String,
  date: Date,
});

const Supporter = mongoose.model("Supporter", supporterSchema);

module.exports = Supporter;
