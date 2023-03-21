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

async function currentBalance(id) {
  return Grantee.findById(id).then((grantee) => {
    const balance = grantee.s;
    return parseInt(balance);
  });
}

router.post("/grantee/:id", function (req, res) {
  Grantee.findById(id).then((grantee) => {
    const supporters = grantee.supporters;
    let amount = 0;
    supporters.forEach((supporter) => {
      amount = parseInt(supporter.amount);
    });
    grantee.balance = amount;
  });
});

router.put("/grantee/:id", async function (req, res) {
  const id = req.params.id;
  const balance = await currentBalance(id);
  const donation = req.query.donation;
  const amount = balance + parseInt(donation);

  Grantee.findByIdAndUpdate(id, { balance: amount }, function (err, grantee) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(grantee);
    }
  });
});

module.exports = router;
