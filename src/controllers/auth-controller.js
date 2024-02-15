const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existedUser = await userService.findExistedUserByEmail(req.body.email);
  if (existedUser) {
    createError("EMAIL_IN_USE", 400);
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
exports.login = catchError(async (req, res, next) => {
  const existedUser = await userService.findExistedUserByEmail(req.body.email);
  if (!existedUser) {
    createError("invalid credentials", 400);
  }
  const isMatch = await hashService.compare(
    req.body.password,
    existedUser.password
  );
  if (!isMatch) {
    createError("invalid credentials", 400);
  }
  const payload = {
    userId: existedUser.id,
    position: existedUser.positionId,
    department: existedUser.departmentId,
  };
  const accessToken = jwtService.sign(payload);
  delete existedUser.password;
  res.status(201).json({ accessToken, user: existedUser });
});

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.getUsersInTheSameDepartment = catchError(async (req, res, next) => {
  const allUsers = await userService.findUserInTheSameDepartment(
    req.user.departmentId
  );
  res.status(200).json({ allUsers });
});
