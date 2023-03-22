const Grantee = require("../models/granteesModel");

const isGranteeExist = function (email) {
return Grantee.findOne({ email: email }).then((res) => {
    return res != undefined;
  });
}

module.exports = {
    isGranteeExist : isGranteeExist
      }
    