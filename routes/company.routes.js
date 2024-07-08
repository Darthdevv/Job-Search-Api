import { Router } from "express";
import { addCompanyData, getCompanyData, searchCompanyByBame } from "../controllers/company.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import authorizationHandler from "../middlewares/auth/authorization.middleware.js";
import { roles } from "../utils/customData.js";

const router = Router();

router.route('/').post(authenticationHandler, authorizationHandler(roles.HR_ONLY), addCompanyData)
router.route('/').get(authenticationHandler, authorizationHandler(roles.HR_ONLY), getCompanyData)
router.route('/search').get(authenticationHandler, authorizationHandler(roles.USER_HR), searchCompanyByBame)

export default router;
