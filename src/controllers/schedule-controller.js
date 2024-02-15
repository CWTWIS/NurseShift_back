const catchError = require("../utils/catch-error");
const scheduleService = require("../services/schedule-service");

exports.createShift = catchError(async (req, res, next) => {
  const data = {
    userId: req.body.userId,
    date: req.body.date,
    shiftTypeId: req.body.shiftTypeId,
  };
  const shift = await scheduleService.createShift(data);
  res.status(201).json({ shift });
});
