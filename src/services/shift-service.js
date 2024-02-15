const prisma = require("../models/prisma");

exports.createShift = (data) => prisma.shift.create({ data });
exports.getAllShiftByDepartmentId = (userDepartmentId) =>
  prisma.shift.findMany({
    where: { user: { departmentId: userDepartmentId } },
  });
exports.getAllShiftByUserId = (userId) =>
  prisma.shift.findMany({
    where: { user: { id: userId } },
  });
