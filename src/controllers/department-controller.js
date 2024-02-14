const catchError = require("../utils/catch-error");
const selectService = require("../services/select-service");

exports.getAllDepartment = catchError(async (req, res, next) => {
  const departments = await selectService.getAllDepartment();
  res.json({ departments });
});
