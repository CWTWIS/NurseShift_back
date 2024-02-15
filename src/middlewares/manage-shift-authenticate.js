const createError = require("../utils/create-error");

const manageShiftAuthenticate = (req, res, next) => {
  const userPosition = req.user.positionId;
  if (userPosition !== 1) {
    return createError(
      "You have no authorization, only head nurse can perform this",
      401
    );
  }
  next();
};

module.exports = manageShiftAuthenticate;
