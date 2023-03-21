const express = require("express");
const router = express.Router();
const axios = require("axios");
const Supporter = require("../models/supporterModel");
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
const genrateSupporter = function (supporter) {
  const newSupporter = new Supporter({
    name: supporter.name,
    amount: parseInt(supporter.amount),
    message: supporter.message,
    picture: supporter.picture,
    date: new Date(),
  });
  console.log(newSupporter);
  newSupporter.save();
  return newSupporter;
};

// const genrateGrantee = function (grantee) {
//   const newGrantee = new Grantee({
//     firstName: grantee.firstName,
//     lastName: lastName,
//     picture: picture,
//     description: description,
//     aboutMe: aboutMe,
//     city: city,
//     country: country,
//     balance: 0,
//     email: email,
//     supporters: [],
//   });
//   console.log(newGrantee);

// }
const updateGranteeBalance = function (granteeId, granteeBalance) {
  return Grantee.findByIdAndUpdate(granteeId, { balance: granteeBalance }).then(
    () => {
      return "updated";
    }
  );
};
router.post("/supporter", async function (req, res) {
  const granteeId = req.query.granteeId;
  const supporter = req.body;
  const newSupporter = genrateSupporter(supporter);
  Grantee.findOneAndUpdate(
    { _id: granteeId },
    { $push: { supporters: newSupporter } }
  ).then(async () => {
    const granteeBalance = await getSupportersDonations(granteeId);
    const message = await updateGranteeBalance(granteeId, granteeBalance);
    res.send({ message: message });
  });
});

router.get("/supporters", function (req, res) {
  let granteeId = req.query.granteeId;
  Grantee.findById(granteeId)
    .populate("supporters")
    .then((grantee) => {
      res.send(grantee.supporters);
    });
});



module.exports = router;
