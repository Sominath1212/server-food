const joi = require("joi");

const registerValidator = async (req, res, next) => {
  const userValidationSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    // username: joi.string().min(4).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required(),
    image: joi.string().optional(),
  });
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details.map((err) => err.message),
    });
  }
  next();
};

const loginValidator = async (req, res, next) => {
  const loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });

  const { error } = loginValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: error.details.map((err) => err.message),
    });
  }
  next();
};

module.exports = {
  loginValidator,
  registerValidator,
};
