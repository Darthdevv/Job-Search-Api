import appError from '../../utils/appError.js'

const reqKeys = ["body", "params", "query", "headers"];

const validationHandler = (schema) => {
  return (req, res, next) => {
    let validationErrors = [];

    for (const key of reqKeys) {

      const validationResult = schema[key]?.validate(req[key], { abortEarly: false });

      if (validationResult?.error) {
        validationErrors.push(validationResult.error.details);
      }
    }

    validationErrors.length
      ? next(new appError("Validation Error", 400, validationErrors))
      : next();
  }
}

export default validationHandler;