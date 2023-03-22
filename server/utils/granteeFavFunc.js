const Grantee = require("../models/granteesModel");

const isGranteeExistInFav = function (granteeId, favId) {
  return Grantee.find({ _id: granteeId }, { favorite: 1, _id: 0 })
    .populate("favorite")
    .then((favoriteGrantees) => {
      let favorites = favoriteGrantees[0].favorite;
      let isExist = false;
      favorites.forEach((f) => {
        if (f._id == favId) {
          isExist = true;
        }
      });
      return isExist;
    });
};

module.exports = { isGranteeExistInFav };
