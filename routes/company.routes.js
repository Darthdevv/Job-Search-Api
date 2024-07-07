import { Router } from "express";
import { addCompanyData } from "../controllers/company.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import authorizationHandler from "../middlewares/auth/authorization.middleware.js";
import { roles } from "../utils/customData.js";

const router = Router();

router.route('/').post(authenticationHandler, authorizationHandler(roles.HR_ONLY), addCompanyData)

export default router;
