import Joi from "joi";
import { generalRules } from "../utils/generalRules.js";
import { systemRoles } from "../utils/customData.js";

export const addJobSchema = {
  body: Joi.object({
    jobTitle: Joi.string()
      .min(5)
      .max(100)
      .pattern(/^[a-zA-Z0-9\s,-]+$/)
      .required()
      .messages({
        "string.base": "Job title should be a type of text.",
        "string.empty": "Job title cannot be empty.",
        "string.min":
          "Job title should have a minimum length of {#limit} characters.",
        "string.max":
          "Job title should have a maximum length of {#limit} characters.",
        "string.pattern.base":
          "Job title can only contain letters, numbers, spaces, and the following characters: , -",
        "any.required": "Job title is a required field.",
      }),
    jobLocation: Joi.string()
      .valid("onsite", "remotely", "hybrid")
      .required()
      .messages({
        "string.base": "Job location should be a type of text.",
        "any.only":
          "Job location must be one of the following: onsite, remotely, hybrid.",
        "any.required": "Job location is a required field.",
      }),
    workingTime: Joi.string()
      .valid("part-time", "full-time")
      .required()
      .messages({
        "string.base": "Working time should be a type of text.",
        "any.only":
          "Working time must be one of the following: part-time, full-time.",
        "any.required": "Working time is a required field.",
      }),
    seniorityLevel: Joi.string()
      .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
      .required()
      .messages({
        "string.base": "Seniority level should be a type of text.",
        "any.only":
          "Seniority level must be one of the following: Junior, Mid-Level, Senior, Team-Lead, CTO.",
        "any.required": "Seniority level is a required field.",
      }),
    jobDescription: Joi.string().min(20).max(1000).required().messages({
      "string.base": "Job description should be a type of text.",
      "string.empty": "Job description cannot be empty.",
      "string.min":
        "Job description should have a minimum length of {#limit} characters.",
      "string.max":
        "Job description should have a maximum length of {#limit} characters.",
      "any.required": "Job description is a required field.",
    }),
    technicalSkills: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .required()
      .messages({
        "array.base": "Technical skills should be an array.",
        "array.min": "There should be at least one technical skill.",
        "string.min":
          "Each technical skill should have a minimum length of {#limit} characters.",
        "string.max":
          "Each technical skill should have a maximum length of {#limit} characters.",
        "any.required": "Technical skills are required.",
      }),
    softSkills: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .required()
      .messages({
        "array.base": "Soft skills should be an array.",
        "array.min": "There should be at least one soft skill.",
        "string.min":
          "Each soft skill should have a minimum length of {#limit} characters.",
        "string.max":
          "Each soft skill should have a maximum length of {#limit} characters.",
        "any.required": "Soft skills are required.",
      }),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const getAllJobsSchema = {
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const getSpecificJobByCompanyNameSchema = {
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

export const updateJobSchema = {
  body: Joi.object({
    jobTitle: Joi.string()
      .min(5)
      .max(100)
      .pattern(/^[a-zA-Z0-9\s,-]+$/)
      .required()
      .messages({
        "string.base": "Job title should be a type of text.",
        "string.empty": "Job title cannot be empty.",
        "string.min":
          "Job title should have a minimum length of {#limit} characters.",
        "string.max":
          "Job title should have a maximum length of {#limit} characters.",
        "string.pattern.base":
          "Job title can only contain letters, numbers, spaces, and the following characters: , -",
        "any.required": "Job title is a required field.",
      }),
    jobLocation: Joi.string()
      .valid("onsite", "remotely", "hybrid")
      .required()
      .messages({
        "string.base": "Job location should be a type of text.",
        "any.only":
          "Job location must be one of the following: onsite, remotely, hybrid.",
        "any.required": "Job location is a required field.",
      }),
    workingTime: Joi.string()
      .valid("part-time", "full-time")
      .required()
      .messages({
        "string.base": "Working time should be a type of text.",
        "any.only":
          "Working time must be one of the following: part-time, full-time.",
        "any.required": "Working time is a required field.",
      }),
    seniorityLevel: Joi.string()
      .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
      .required()
      .messages({
        "string.base": "Seniority level should be a type of text.",
        "any.only":
          "Seniority level must be one of the following: Junior, Mid-Level, Senior, Team-Lead, CTO.",
        "any.required": "Seniority level is a required field.",
      }),
    jobDescription: Joi.string().min(20).max(1000).required().messages({
      "string.base": "Job description should be a type of text.",
      "string.empty": "Job description cannot be empty.",
      "string.min":
        "Job description should have a minimum length of {#limit} characters.",
      "string.max":
        "Job description should have a maximum length of {#limit} characters.",
      "any.required": "Job description is a required field.",
    }),
    technicalSkills: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .required()
      .messages({
        "array.base": "Technical skills should be an array.",
        "array.min": "There should be at least one technical skill.",
        "string.min":
          "Each technical skill should have a minimum length of {#limit} characters.",
        "string.max":
          "Each technical skill should have a maximum length of {#limit} characters.",
        "any.required": "Technical skills are required.",
      }),
    softSkills: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .required()
      .messages({
        "array.base": "Soft skills should be an array.",
        "array.min": "There should be at least one soft skill.",
        "string.min":
          "Each soft skill should have a minimum length of {#limit} characters.",
        "string.max":
          "Each soft skill should have a maximum length of {#limit} characters.",
        "any.required": "Soft skills are required.",
      }),
  }),
  headers: Joi.object({
    ...generalRules.headers,
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};

export const deleteJobSchema = {
  params: generalRules.objectId.required(),
  headers: Joi.object({
    ...generalRules.headers,
    authorization: Joi.string(),
  }).options({ presence: "required" }),
};
