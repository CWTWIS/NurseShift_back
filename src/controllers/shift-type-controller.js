const catchError = require("../utils/catch-error");
const selectService = require("../services/select-service");

exports.getAllShiftType = catchError(async (req, res, next) => {
  const shiftType = await selectService.getAllShiftType();
  res.json({ shiftType });
});
