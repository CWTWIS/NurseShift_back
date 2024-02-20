const prisma = require("../models/prisma");

exports.createShift = (data) => prisma.shift.create({ data });
exports.getAllShiftByDepartmentId = (userDepartmentId) =>
  prisma.shift.findMany({
    where: { user: { departmentId: userDepartmentId } },
    include: { shiftType: true },
    orderBy: { shiftTypeId: "asc" },
  });
exports.getAllShiftByUserId = (userId) =>
  prisma.shift.findMany({
    where: { user: { id: userId } },
    include: { shiftType: true },
  });
exports.getShiftByShiftId = (shiftId) =>
  prisma.shift.findUnique({
    where: { id: parseInt(shiftId) },
    include: { user: { select: { departmentId: true } } },
  });
exports.updateShift = (shiftId, data) =>
  prisma.shift.update({ where: { id: parseInt(shiftId) }, data });
exports.deleteShift = (shiftId) =>
  prisma.shift.delete({ where: { id: parseInt(shiftId) } });
