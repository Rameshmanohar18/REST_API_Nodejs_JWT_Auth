const { body } = require('express-validator');

exports.updateUserValidation = [
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name should contain minimum 2 characters'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email required')
];