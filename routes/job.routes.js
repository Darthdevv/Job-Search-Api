import { Router } from "express";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import authorizationHandler from "../middlewares/auth/authorization.middleware.js";
import { addJob, deleteJob, getAllJobs, getJobsForSpecificCompany, updateJob } from "../controllers/job.controllers.js";
import { roles } from "../utils/customData.js";

const router = Router();

router.route('/').post(authenticationHandler, authorizationHandler(roles.HR_ONLY), addJob).get(authenticationHandler, authorizationHandler(roles.USER_HR), getAllJobs);
router.route('/jobs-for-company').get(authenticationHandler, authorizationHandler(roles.USER_HR), getJobsForSpecificCompany);
router.route('/:id').patch(authenticationHandler, authorizationHandler(roles.HR_ONLY), updateJob).delete(authenticationHandler, authorizationHandler(roles.HR_ONLY), deleteJob)

export default router;
