const express = require("express");
const app = express();
const api = require("./server/routes/granteesApi");
const loginApi = require("./server/routes/loginApi");
const path = require("path");
const testApi = require("./server/routes/testApi");
const middleWares = require("./server/utils/middleWareFunc");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/buyMeAknafehDB", {
    useNewUrlParser: true,
  })
  .then(() => console.log("conneted to DB"))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "dist/homepage")));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "dist/sign-in")));
app.use(express.static(path.join(__dirname, "dist/homepage")));
app.use(express.static(path.join(__dirname, "dist/grantees")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", api);
app.use("/test", testApi);
app.use("/users", loginApi);

app.get("/grantees", middleWares.authenticateUser, (req, res) => {});
const port = 3000;
app.listen(port, function () {
  console.log(`Running on port ${port}`);
});
