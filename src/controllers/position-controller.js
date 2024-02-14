const catchError = require("../utils/catch-error");
const selectService = require("../services/select-service");

exports.getAllPosition = catchError(async (req, res, next) => {
  const positions = await selectService.getAllPosition();
  res.json({ positions });
});
