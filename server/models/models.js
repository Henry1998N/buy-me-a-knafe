const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schema = new Schema({});

const Weather = mongoose.model("weather", Schema);

module.exports = Weather;
