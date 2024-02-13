const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existedUser = await userService.findExistedUserByEmail(req.body.email);
  if (existedUser) {
    createError("EMAIL_In_USE", 400);
  }
  console.log(req.body);
  req.body.password = await hashService.hash(req.body.password);
  const newUser = await userService.createUser(req.body);
  const payload = {
    userId: newUser.id,
    position: newUser.positionId,
    department: newUser.departmentId,
  };
  const accessToken = jwtService.sign(payload);
  delete newUser.password;
  res.status(201).json({ accessToken, newUser });
});
exports.login = catchError(async (req, res, next) => {});
