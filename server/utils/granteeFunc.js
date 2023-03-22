const Grantee = require("../models/granteesModel");

const isGranteeExist = function (email) {
  return Grantee.findOne({ email: email }).then((res) => {
    return res != undefined;
  });
};
// let x = "641b13ff80b7132979cb9de2";

const genrateGrantee = function (granteeId) {
  // const newGrantee = new Grantee({
  //   firstName: grantee.firstName,
  //   lastName: grantee.lastName,
  //   picture: grantee.picture,
  //   description: grantee.description,
  //   aboutMe: grantee.aboutMe,
  //   city: grantee.city,
  //   country: grantee.country,
  //   balance: grantee.balance,
  //   email: grantee.email,
  //   supporters: grantee.supporters,
  //   password: grantee.password,
  //   quote: grantee.quote,
  //   favorite: grantee.favorite,
  // });
  return Grantee.findOne({ _id: granteeId }).then((res) => {
    return res;
  });
  // newGrantee.save();
  // return newGrantee;
};

// console.log(genrateGrantee(x));

module.exports = {
  isGranteeExist: isGranteeExist,
  genrateGrantee: genrateGrantee,
};
