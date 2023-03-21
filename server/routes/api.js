const express = require("express");
const router = express.Router();
const axios = require("axios");

const Grantee = require("../models/granteesModel");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    res.send(grantee);
  });
});

module.exports = router;
