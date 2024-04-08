const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const validateUserData = Joi.object({
  firstname: Joi.string()
    .required()
    .messages({ "string.empty": "Firstname cannot be empty" }),
  lastname: Joi.string()
    .required()
    .messages({ "string.empty": "Lastname cannot be empty" }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password cannot be empty" }),
  gender: Joi.string()
    .required()
    .messages({ "string.empty": "Gender cannot be empty" }),
  hobbies: Joi.required().messages({
    "any.required": "Hobbies cannot be empty",
  }),
  userRole: Joi.string()
    .required()
    .messages({ "string.empty": "UserRole cannot be empty" }),
  profile_pic: Joi.string()
    .required()
    .messages({ "string.empty": "Profile picture cannot be empty" }),
});

exports.validateUser = validator(validateUserData);
