import Joi from "joi";
import { generalRules } from "../utils/generalRules.js";
import { systemRoles } from "../utils/customData.js";

export const addCompanySchema = {
  body: Joi.object({
    companyName: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z0-9\s,.'-]+$/)
      .required()
      .messages({
        'string.base': 'Company name should be a type of text.',
        'string.empty': 'Company name cannot be empty.',
        'string.min': 'Company name should have a minimum length of {#limit} characters.',
        'string.max': 'Company name should have a maximum length of {#limit} characters.',
        'string.pattern.base': 'Company name can only contain letters, numbers, spaces, and the following characters: , . \' -',
        'any.required': 'Company name is a required field.',
    }),
    description: Joi.string().min(10).max(500).required().messages({
      "string.base": "Description should be a type of text.",
      "string.empty": "Description cannot be empty.",
      "string.min":
        "Description should have a minimum length of {#limit} characters.",
      "string.max":
        "Description should have a maximum length of {#limit} characters.",
      "any.required": "Description is a required field.",
    }),
    industry: Joi.string()
      .valid(
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Retail",
        "Manufacturing"
      )
      .required()
      .messages({
        "string.base": "Industry should be a type of text.",
        "string.empty": "Industry cannot be empty.",
        "any.only":
          "Industry must be one of the predefined values: Technology, Healthcare, Finance, Education, Retail, Manufacturing.",
        "any.required": "Industry is a required field.",
      }),
    companyEmail: Joi.string()
      .required()
      .email({
        tlds: { allow: ["com", "net", "org"] },
        minDomainSegments: 1,
        maxDomainSegments: 4,
      }),
    address: Joi.string()
      .pattern(/^[a-zA-Z0-9\s,.'-]{10,100}$/)
      .required()
      .messages({
        "string.base": "Address should be a type of text.",
        "string.empty": "Address cannot be empty.",
        "string.pattern.base":
          "Address must be between 10 and 100 characters and can contain letters, numbers, spaces, and the following characters: , . ' -",
        "any.required": "Address is a required field.",
      }),
    numberOfEmployees: Joi.number()
      .integer()
      .min(1)
      .max(10000)
      .required()
      .messages({
        "number.base": "Number of employees must be a number.",
        "number.integer": "Number of employees must be an integer.",
        "number.min": "Number of employees must be at least {#limit}.",
        "number.max":
          "Number of employees must be less than or equal to {#limit}.",
        "any.required": "Number of employees is a required field.",
      }),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const getAllCompaniesSchema = {
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const getSpecificCompanyByNameSchema = {
  query: Joi.object({
    companyName: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z0-9\s,.'-]+$/)
      .required()
      .messages({
        "string.base": "Company name should be a type of text.",
        "string.empty": "Company name cannot be empty.",
        "string.min":
          "Company name should have a minimum length of {#limit} characters.",
        "string.max":
          "Company name should have a maximum length of {#limit} characters.",
        "string.pattern.base":
          "Company name can only contain letters, numbers, spaces, and the following characters: , . ' -",
        "any.required": "Company name is a required field.",
      }),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const updateCompanySchema = {
  params: generalRules.objectId.required(),
  body: Joi.object({
    companyName: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[a-zA-Z0-9\s,.'-]+$/)
      .required()
      .messages({
        "string.base": "Company name should be a type of text.",
        "string.empty": "Company name cannot be empty.",
        "string.min":
          "Company name should have a minimum length of {#limit} characters.",
        "string.max":
          "Company name should have a maximum length of {#limit} characters.",
        "string.pattern.base":
          "Company name can only contain letters, numbers, spaces, and the following characters: , . ' -",
        "any.required": "Company name is a required field.",
      }),
    description: Joi.string().min(10).max(500).required().messages({
      "string.base": "Description should be a type of text.",
      "string.empty": "Description cannot be empty.",
      "string.min":
        "Description should have a minimum length of {#limit} characters.",
      "string.max":
        "Description should have a maximum length of {#limit} characters.",
      "any.required": "Description is a required field.",
    }),
    industry: Joi.string()
      .valid(
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Retail",
        "Manufacturing"
      )
      .required()
      .messages({
        "string.base": "Industry should be a type of text.",
        "string.empty": "Industry cannot be empty.",
        "any.only":
          "Industry must be one of the predefined values: Technology, Healthcare, Finance, Education, Retail, Manufacturing.",
        "any.required": "Industry is a required field.",
      }),
    companyEmail: Joi.string()
      .required()
      .email({
        tlds: { allow: ["com", "net", "org"] },
        minDomainSegments: 1,
        maxDomainSegments: 4,
      }),
    address: Joi.string()
      .pattern(/^[a-zA-Z0-9\s,.'-]{10,100}$/)
      .required()
      .messages({
        "string.base": "Address should be a type of text.",
        "string.empty": "Address cannot be empty.",
        "string.pattern.base":
          "Address must be between 10 and 100 characters and can contain letters, numbers, spaces, and the following characters: , . ' -",
        "any.required": "Address is a required field.",
      }),
    numberOfEmployees: Joi.number()
      .integer()
      .min(1)
      .max(10000)
      .required()
      .messages({
        "number.base": "Number of employees must be a number.",
        "number.integer": "Number of employees must be an integer.",
        "number.min": "Number of employees must be at least {#limit}.",
        "number.max":
          "Number of employees must be less than or equal to {#limit}.",
        "any.required": "Number of employees is a required field.",
      }),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const deleteCompanySchema = {
  params: generalRules.objectId.required(),
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};
