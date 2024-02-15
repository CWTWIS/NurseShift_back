const prisma = require("../models/prisma");

exports.createShift = (data) => prisma.shift.create({ data });
exports.getAllShiftByDepartmentId = (data) => prisma.shift.findMany({ data });
