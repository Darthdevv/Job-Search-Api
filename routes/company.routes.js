import { Router } from "express";
import { addCompanyData, deleteCompanyData, getCompanyData, searchCompanyByName, updateCompanyData } from "../controllers/company.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import authorizationHandler from "../middlewares/auth/authorization.middleware.js";
import validationHandler from "../middlewares/validation/validation.middleware.js";
import { roles } from "../utils/customData.js";
import { addCompanySchema, deleteCompanySchema, getAllCompaniesSchema, getSpecificCompanyByNameSchema, updateCompanySchema } from "../schemas/company.schema.js";

const router = Router();

router.route('/').post(authenticationHandler, authorizationHandler(roles.HR_ONLY), validationHandler(addCompanySchema), addCompanyData)
router.route('/').get(authenticationHandler, authorizationHandler(roles.HR_ONLY), validationHandler(getAllCompaniesSchema), getCompanyData)
router.route('/search').get(authenticationHandler, authorizationHandler(roles.USER_HR), validationHandler(getSpecificCompanyByNameSchema), searchCompanyByName)
router.route('/:id').patch(authenticationHandler, authorizationHandler(roles.HR_ONLY), validationHandler(updateCompanySchema), updateCompanyData).delete(authenticationHandler, authorizationHandler(roles.HR_ONLY),validationHandler(deleteCompanySchema), deleteCompanyData)

export default router;
