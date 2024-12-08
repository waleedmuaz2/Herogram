const { body, validationResult } = require('express-validator');

const registerValidationRules = () => [
  body('email').isEmail(),
  body('email').notEmpty(),
  body('userName').notEmpty(),
  body('password').isLength({ min: 6 })
];

const loginValidationRules = () => [
    body('email').isEmail(),
    body('email').notEmpty(),
    body('password').isLength({ min: 6 })
  ];
  
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendJsonResponse(res, 400, { error: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate
}; 