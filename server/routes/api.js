const express = require("express");
const router = express.Router();
const axios = require("axios");
const Grantees = require("../models/granteesModel");

router.get("/users", function (req, res) {
  axios.get("https://randomuser.me/api/?results=7").then((data) => {
    let aboutMe = [];
    let users = data.data.results.map((a) => {
      return {
        name: a.name.first + " " + a.name.last,
        city: a.location.city,
        country: a.location.country,
        email: a.email,
        picture: a.picture.thumbnail,
      };
    });
    // for (let i = 0; i < 7; i++) {
    //   axios
    //     .get(
    //       "https://baconipsum.com/api/?type=all-meat&sentences=2&start-with-lorem=1"
    //     )
    //     .then((section) => {
    //       users[i].aboutme = section.data[0];
    //     });
    // }

    res.send(aboutMe);
  });
});
module.exports = router;
