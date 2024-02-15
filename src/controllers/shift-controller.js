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
    return createError("department does not match", 403);
  }
  const shift = await shiftService.createShift(data);
  res.status(201).json({ shift });
});

exports.getAllShift = catchError(async (req, res, next) => {});
exports.deleteShift = catchError(async (req, res, next) => {});
exports.editShift = catchError(async (req, res, next) => {});
