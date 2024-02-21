const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");

exports.updateUser = catchError(async (req, res, next) => {
  if (!req.files && !req.body) {
    throw createError("Profile image or user details are required", 400);
  }
  const data = {};
  if (req.files.profileImage) {
    data.profileImage = await uploadService.upload(
      req.files.profileImage[0].path
    );
    fs.unlink(req.files.profileImage[0].path);
  }

  if (req.body) {
    const { firstName, lastName, email, mobile } = req.body;
    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (email) {
      const existedEmail = await userService.findExistedUserByEmail(
        req.body.email
      );
      if (existedEmail) {
        createError("EMAIL_IN_USE", 400);
      }
      data.email = email;
    }
    if (mobile) {
      const existedMobile = await userService.findExistedUserByMobile(
        req.body.mobile
      );
      if (existedMobile) {
        createError("MOBILE_IN_USE", 400);
      }
      data.mobile = mobile;
    }
  }

  await userService.updateUserById(data, req.user.id);
  res.status(200).json(data);
});
