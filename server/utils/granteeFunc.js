const Grantee = require("../models/granteesModel");

const isGranteeExist = function (email) {
  return Grantee.findOne({ email: email }).then((res) => {
    return res != undefined;
  });
};

const genrateGrantee = function (granteeId) {
  return Grantee.findOne({ _id: granteeId }).then((res) => {
    return res;
  });
};

module.exports = {
  isGranteeExist: isGranteeExist,
  genrateGrantee: genrateGrantee,
};
