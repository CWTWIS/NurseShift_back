const catchError = require("../utils/catch-error");
const shiftService = require("../services/shift-service");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.createShift = catchError(async (req, res, next) => {
  const userDepartmentId = req.user.departmentId;
  const data = {
    userId: req.body.userId,
    date: req.body.date,
    shiftTypeId: req.body.shiftTypeId,
  };
  const targetUser = await prisma.user.findUnique({
    where: { id: data.userId },
    select: { departmentId: true },
  });
  if (!targetUser) {
    return createError("user not found", 404);
  }
  if (userDepartmentId !== targetUser.departmentId) {
    return createError("User does not have permission to create shift", 403);
  }
  const shift = await shiftService.createShift(data);
  res.status(201).json({ shift });
});

exports.getAllShiftsInTheSameDepartment = catchError(async (req, res, next) => {
  const userDepartmentId = req.user.departmentId;
  const shifts = await shiftService.getAllShiftByDepartmentId(userDepartmentId);
  res.status(201).json({ shifts });
});

exports.getAllShiftsByUserId = catchError(async (req, res, next) => {
  const { userId } = req.params;
  const shifts = await shiftService.getAllShiftByUserId(parseInt(userId));
  res.status(201).json({ shifts });
});

exports.editShift = catchError(async (req, res, next) => {
  const { shiftId } = req.params;
  const userDepartmentId = req.user.departmentId;
  const data = {
    userId: req.body.userId,
    date: req.body.date,
    shiftTypeId: req.body.shiftTypeId,
  };
  const existingShift = await shiftService.getShiftByShiftId(shiftId);
  if (!existingShift) {
    return createError("shift not found", 404);
  }
  if (existingShift.user.departmentId !== userDepartmentId) {
    return createError("User does not have permission to edit this shift", 403);
  }
  const updatedShifted = await shiftService.updateShift(shiftId, data);
  res.status(200).json({ updatedShifted });
});

exports.deleteShift = catchError(async (req, res, next) => {
  const { shiftId } = req.params;
  const userDepartmentId = req.user.departmentId;
  const existingShift = await shiftService.getShiftByShiftId(shiftId);
  if (!existingShift) {
    return createError("shift not found", 404);
  }
  if (existingShift.user.departmentId !== userDepartmentId) {
    return createError(
      "User does not have permission to delete this shift",
      403
    );
  }
  await shiftService.deleteShift(shiftId);
  res.status(204).send();
});
