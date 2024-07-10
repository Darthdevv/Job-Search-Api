import Joi from "joi";
import { generalRules } from "../utils/generalRules.js";
import { systemRoles } from "../utils/customData.js";

export const addJobSchema = {
  body: Joi.object({
    firstName: Joi.string().min(2).max(30).alphanum().required(),
    lastName: Joi.string().min(2).max(30).alphanum().required(),
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({
      tlds: { allow: ["com", "net", "org"] },
      minDomainSegments: 1,
      maxDomainSegments: 4,
    }),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&@])[A-Za-z\d$!%*?&@]{8,}$/
      )
      .messages({
        "string.pattern.base":
          "Password should have a minimum length of 8 characters with at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
      })
      .required(),
    recoveryEmail: Joi.string().email({
      tlds: { allow: ["com", "net", "org"] },
      minDomainSegments: 1,
      maxDomainSegments: 4,
    }),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base":
          "Phone number must be between 10 to 15 digits and contain only numbers.",
        "string.empty": "Phone number cannot be empty.",
      })
      .required(),
    role: Joi.string()
      .valid("user", "human resources")
      .messages({
        "any.only": "role must be one of {{#valids}}.",
        "string.empty": "role cannot be empty.",
      })
      .required(),
    status: Joi.string()
      .valid("online", "offline")
      .messages({
        "any.only": "status must be one of {{#valids}}.",
      })
      .optional(),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
  }).options({ presence: "required" }),
};

export const getAllJobsSchema = {
  headers: Joi.object({
    ...generalRules.headers,
  }).options({ presence: "required" }),
};

export const getSpecificJobSchema = {
  params: generalRules.objectId.required(),
  headers: Joi.object({
    ...generalRules.headers,
  }).options({ presence: "required" }),
};

export const updateJobSchema = {
  body: Joi.object({
    firstName: Joi.string().min(2).max(30).alphanum().required(),
    lastName: Joi.string().min(2).max(30).alphanum().required(),
    email: Joi.string().email({
      tlds: { allow: ["com", "net", "org"] },
      minDomainSegments: 1,
      maxDomainSegments: 4,
    }),
    recoveryEmail: Joi.string().email({
      tlds: { allow: ["com", "net", "org"] },
      minDomainSegments: 1,
      maxDomainSegments: 4,
    }),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .messages({
        "string.pattern.base":
          "Phone number must be between 10 to 15 digits and contain only numbers.",
        "string.empty": "Phone number cannot be empty.",
      })
      .required(),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const deleteJobSchema = {
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};
