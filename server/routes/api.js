const express = require("express");
const router = express.Router();
const axios = require("axios");
const Grantee = require("../models/granteesModel");
const getUsers = function () {
  return axios.get("https://randomuser.me/api/?results=7").then((data) => {
    let users = data.data.results.map((a) => {
      return {
        firstName: a.name.first,
        lastName: a.name.last,
        city: a.location.city,
        country: a.location.country,
        email: a.email,
        picture: a.picture.thumbnail,
      };
    });
    return users;
  });
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
});
router.get("/grantees", function (req, res) {});
module.exports = router;
