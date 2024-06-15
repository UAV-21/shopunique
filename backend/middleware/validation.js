const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().strict().min(3).max(30),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
    role: Joi.number().valid(777).optional()
  });

  return schema.validate(data, options);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
    fullName: Joi.string().required().strict(),
  });

  return schema.validate(data, options);
};

const createProductValidation = (data) => {
  const schema = Joi.object({
    cat_id: Joi.number().required().strict(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).max(99999.99).strict().required(),
    quantity: Joi.number().max(1200).strict().required(),
    short_desc: Joi.string().required()
  });

  return schema.validate(data, options)
}
module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  createProductValidation
};
