const express = require("express");
const app = express();
const api = require("./server/routes/api");
const path = require("path");
const testApi = require("./server/routes/testApi");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/buyMeAknafehDB", {
    useNewUrlParser: true,
  })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "dist/homepage")));
app.use(express.static(path.join(__dirname, "dist/sign-up")));
app.use(express.static(path.join(__dirname, "dist/grantees")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", api);
app.use("/test", testApi);
const port = 3000;
app.listen(port, function () {
  console.log(`Running on port ${port}`);
});
