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

router.get("/grantee", function (req, res) {
  let id = req.query.id;
  Grantee.findById({ _id: id }).then((grantee) => {
    console.log(grantee);
    res.send(grantee);
  });
});
const getSupportersDonations = async function (id) {
  return Grantee.find({ _id: id })
    .populate("supporters")
    .then((granteeSupporters) => {
      let supporters = granteeSupporters[0].supporters.map((s) => s.amount);
      supporters.forEach((s) => (s = parseInt(s)));
      const sum = supporters.reduce((a, b) => a + b, 0);
      return sum;
    });
};
router.post("/supporter", async function (req, res) {
  const granteeId = req.query.granteeId;
  const supporter = req.body.supporter;
  Grantee.findById(granteeId).then(async (grantee) => {
    grantee.supporters.push(supporter);
    const granteeBalance = await getSupportersDonations(granteeId);
    grantee.balance = granteeBalance;
    res.send(grantee);
  });
});

module.exports = router;
