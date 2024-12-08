const express = require("express");
const { login, register } = require("../controllers/authController");
const { registerValidationRules, loginValidationRules, validate } = require("../validators/authValidators");
const router = express.Router();

router.post("/register", 
  registerValidationRules(),
  validate,
  register
);
router.post("/login", 
  loginValidationRules(),
  validate,
  login
);


module.exports = router;
