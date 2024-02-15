const prisma = require("../models/prisma");

exports.findExistedUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email: email } });

exports.createUser = (data) => prisma.user.create({ data });
exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    // include: { position: true, department: true },
  });
exports.updateUserById = (data, id) =>
  prisma.user.update({ data, where: { id } });

exports.findUserInTheSameDepartment = (departmentId) =>
  prisma.user.findMany({ where: { departmentId } });
