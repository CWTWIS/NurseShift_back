const express = require("express");
const authController = require("../controllers/auth-controller");
const positionController = require("../controllers/position-controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validators/validate-auth");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getMe);
// router.get("/position", positionController.getAllPosition);

module.exports = router;
