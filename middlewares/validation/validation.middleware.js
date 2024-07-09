import appError from '../../utils/appError.js'

const reqKeys = ["body", "params", "query", "headers"];

/**
 * @param {object} schema - Joi schema object
 * @returns  {Function} - Middleware function
 * @description - Middleware function to validate the request data against the schema
*/

const validationHandler = (schema) => {
  return (req, res, next) => {
    // Initialize validation errors array
    let validationErrors = [];

    for (const key of reqKeys) {
      // Validate the request data against the schema of the same key
      const validationResult = schema[key]?.validate(req[key], {
        abortEarly: false,
      });

      // If there is an error, push the error details to the validationErrors array
      if (validationResult?.error) {
        validationErrors.push(validationResult.error.details);
      }
    }

    // If there are validation errors, return the error response  with the validation errors
    validationErrors.length
      ? next(new appError("Validation Error", 400, validationErrors))
      : next();
  }
}

export default validationHandler;