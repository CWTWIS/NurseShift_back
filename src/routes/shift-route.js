const express = require("express");
const router = express.Router();
const manageShiftAuthenticate = require("../middlewares/manage-shift-authenticate");
const shiftController = require("../controllers/shift-controller");

router.post("/", manageShiftAuthenticate, shiftController.createShift);
router.get("/", shiftController.getAllShiftsInTheSameDepartment);
router.get("/:userId", shiftController.getAllShiftsByUserId);
router.patch("/:shiftId", manageShiftAuthenticate, shiftController.editShift);
router.delete(
  "/:shiftId",
  manageShiftAuthenticate,
  shiftController.deleteShift
);

module.exports = router;
