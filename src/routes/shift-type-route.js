const express = require("express");
const shiftTypeController = require("../controllers/shift-type-controller");

const router = express.Router();

router.get("/", shiftTypeController.getAllShiftType);
module.exports = router;
