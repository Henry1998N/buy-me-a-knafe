const express = require("express");
const router = express.Router();
const axios = require("axios");

const Grantee = require("../models/granteesModel");

router.get("/grantees", function (req, res) {
  Grantee.find({}).then((grantee) => {
    res.send(grantee);
  });
<<<<<<< HEAD
};
const getAboutMeSection = async function () {
  return axios
    .get(
      "https://baconipsum.com/api/?type=all-meat&sentences=2&start-with-lorem=1"
    )
    .then((section) => {
      return section.data[0];
    });
};
const saveGrantees = function (grantees) {
  grantees.forEach((element) => {
    let newGrante = new Grantee({
      firstName: element.firstName,
      lastName: element.lastName,
      picture: element.picture,
      aboutMe: element.aboutme,
      city: element.city,
      country: element.country,
      balance: 0,
      email: element.email,
      supporters: [],
    });
    newGrante.save();
  });
};
router.get("/users", function (req, res) {
  getUsers()
    .then(async (users) => {
      for (let i = 0; i < 7; i++) {
        let section = await getAboutMeSection();
        users[i].aboutme = section;
      }
      return users;
    })
    .then((users) => {
      // saveGrantees(users);
      res.send(users);
    });
=======
>>>>>>> 120b4d6f0badec0ba82554457755ba92e18b6913
});

module.exports = router;
