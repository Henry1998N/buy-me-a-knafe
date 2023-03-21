const express = require("express");
const router = express.Router();
const axios = require("axios");

const Grantee = require("../models/granteesModel");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    console.log(grantee);
    res.send(grantee);
  });
});

async function currentBalance(id) {
  return Grantee.findById(id).then((grantee) => {
    const balance = grantee.balance;
    return balance;
  });
}

router.put("/grantee/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const balance = await currentBalance(id);
  console.log(balance);
  const donation = req.query.donation;
  const amount = balance + donation;

  Grantee.findByIdAndUpdate(id, { balance: amount }, function (err, grantee) {
    if (err) {
      res.send(err);
    } else {
      res.send(grantee);
    }
  });
});

module.exports = router;
