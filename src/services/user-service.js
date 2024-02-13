const prisma = require("../models/prisma");

exports.findExistedUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email: email } });

exports.createUser = (data) => prisma.user.create({ data });
exports.findUserById = (id) => prisma.user.findUnique({ where: { id } });
exports.updateUserById = (data, id) =>
  prisma.user.update({ data, where: { id } });
