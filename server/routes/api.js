const express = require("express");
const router = express.Router();
const axios = require("axios");

const Grantee = require("../models/granteesModel");
const { log } = require("handlebars");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    res.send(grantee);
  });
});

router.get("/grantee", function (req, res) {
  let id = req.query.id;
  Grantee.findById({ _id: id }).then((grantee) => {
    res.send(grantee);
  });
});

router.post("/supporters/:granteeId", function (req, res) {
  let granteeId = req.query.granteeId;
  Grantee.aggregate([
    {
      $match: { _id: granteeId },
    },
    {
      $group: { _id: "$group", amount: { $sum: "" } },
    },
  ]).then((grantee) => {
    console.log(grantee);
    res.send(grantee);
  });
});
const ubdateBalance = function (id) {
  Grantee.findById(id).then((grantee) => {
    const supporters = grantee.supporters;
    let amount = 0;
    supporters.forEach((supporter) => {
      amount += parseInt(supporter.amount);
    });
    grantee.balance = amount;
  });
};
module.exports = router;
