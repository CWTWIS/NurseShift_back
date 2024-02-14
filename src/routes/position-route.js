const express = require("express");
const positionController = require("../controllers/position-controller");

const router = express.Router();

router.get("/", positionController.getAllPosition);
module.exports = router;
