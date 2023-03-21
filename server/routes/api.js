const express = require("express");
const router = express.Router();
const axios = require("axios");

const Grantee = require("../models/granteesModel");
const { log } = require("handlebars");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    console.log(grantee);
    res.send(grantee);
  });
});

router.post("/grantee/:id", function (req, res) {
  Grantee.findById(id).then((grantee) => {
    const supporters = grantee.supporters;
    let amount = 0;
    supporters.forEach((supporter) => {
      amount += parseInt(supporter.amount);
    });
    grantee.balance = amount;
  });
});

module.exports = router;
