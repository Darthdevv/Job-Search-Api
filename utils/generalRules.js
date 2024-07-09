import Joi from "joi";

const objectIdValidation = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("Invalid ObjectId");
};

export const generalRules = {
  objectId: Joi.string().custom(objectIdValidation),
  headers: {
    "cache-control": Joi.string(),
    "accept": Joi.string().valid("*/*"),
    "accept-encoding": Joi.string(),
    "host": Joi.string(),
    "user-agent": Joi.string(),
    "postman-token": Joi.string(),
    "connection": Joi.string(),
  },
};
