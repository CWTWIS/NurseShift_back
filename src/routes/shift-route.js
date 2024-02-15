const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const manageShiftAuthenticate = require("../middlewares/manage-shift-authenticate");
const shiftController = require("../controllers/shift-controller");

router.post(
  "/",
  authenticate,
  manageShiftAuthenticate,
  shiftController.createShift
);
router.get(
  "/",
  authenticate,
  // manageShiftAuthenticate,
  shiftController.getAllShiftsInTheSameDepartment
);
router.get(
  "/me",
  authenticate,
  // manageShiftAuthenticate,
  shiftController.getAllShiftsByUserId
);

module.exports = router;
