const express = require("express");
const router = express.Router();
const axios = require("axios");
const Supporter = require("../models/supporterModel");
const Grantee = require("../models/granteesModel");
const supporterFun = require("../utils/supporterFunc");
const balanceFunc = require("../utils/balanceFunc");
const { log } = require("handlebars");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    res.send(grantee);
  });
});

router.post("/signUp", async function (req, res) {
  let newGrantee = req.body;
  let g1 = new Grantee({
    firstName: newGrantee.firstName,
    lastName: newGrantee.lastName,
    picture: newGrantee.picture,
    description: newGrantee.description,
    aboutMe: newGrantee.aboutMe,
    city: newGrantee.city,
    country: newGrantee.country,
    balance: 0,
    email: newGrantee.email,
    supporters: [],
  });
  g1.save();
});

router.get("/grantee", function (req, res) {
  let id = req.query.id;
  Grantee.findById({ _id: id }).then((grantee) => {
    res.send(grantee);
  });
});

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
  const newSupporter = supporterFun.genrateSupporter(supporter);
  Grantee.findOneAndUpdate(
    { _id: granteeId },
    { $push: { supporters: newSupporter } }
  ).then(async () => {
    const granteeBalance = await supporterFun.getSupportersDonations(granteeId);
    const message = await balanceFunc.updateGranteeBalance(
      granteeId,
      granteeBalance
    );
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
