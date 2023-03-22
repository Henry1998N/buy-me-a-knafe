const Grantee = require("../models/granteesModel");

const updateGranteeBalance = function (granteeId, granteeBalance) {
  return Grantee.findByIdAndUpdate(granteeId, { balance: granteeBalance }).then(
    () => {
      return "updated";
    }
  );
};

module.exports = {
  updateGranteeBalance: updateGranteeBalance,
};
