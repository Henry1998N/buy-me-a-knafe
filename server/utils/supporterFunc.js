
const Grantee = require("../models/granteesModel");
const Supporter = require("../models/supporterModel");


  const genrateSupporter = function (supporter) {
    const newSupporter = new Supporter({
      name: supporter.name,
      amount: parseInt(supporter.amount),
      message: supporter.message,
      picture: supporter.picture,
      date: new Date(),
    });
    newSupporter.save();
    return newSupporter;
  };

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
  

  module.exports = {
    genrateSupporter : genrateSupporter,
    getSupportersDonations: getSupportersDonations
  }
