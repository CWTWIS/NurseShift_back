const express = require("express");
const upload = require("../middlewares/upload");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.patch(
  "/",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  userController.updateUser
);

module.exports = router;
