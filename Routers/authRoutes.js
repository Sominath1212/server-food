const express = require("express");
const { login, register } = require("../Controllers/authController");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/validator");
const router = express.Router();

router.post("/login", loginValidator, login);
router.post("/register", registerValidator, register);

module.exports = router;
