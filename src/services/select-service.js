const prisma = require("../models/prisma");

exports.getAllPosition = () =>
  prisma.position.findMany({ select: { id: true, typeOfPosition: true } });

exports.getAllDepartment = () =>
  prisma.department.findMany({ select: { id: true, typeOfDepartment: true } });

exports.getAllShiftType = () =>
  prisma.shiftType.findMany({ select: { id: true, typeOfShift: true } });
