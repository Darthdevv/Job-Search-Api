import { Router } from "express";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import authorizationHandler from "../middlewares/auth/authorization.middleware.js";
import validationHandler from "../middlewares/validation/validation.middleware.js";
import { addJob, deleteJob, getAllJobs, getJobsForSpecificCompany, updateJob } from "../controllers/job.controllers.js";
import { roles } from "../utils/customData.js";
import { addJobSchema, deleteJobSchema, getAllJobsSchema, getSpecificJobByCompanyNameSchema, updateJobSchema } from "../schemas/job.schema.js";

const router = Router();

router.route('/').post(authenticationHandler, authorizationHandler(roles.HR_ONLY),validationHandler(addJobSchema), addJob).get(authenticationHandler, authorizationHandler(roles.USER_HR),validationHandler(getAllJobsSchema), getAllJobs);
router.route('/jobs-for-company').get(authenticationHandler, authorizationHandler(roles.USER_HR),validationHandler(getSpecificJobByCompanyNameSchema), getJobsForSpecificCompany);
router.route('/:id').patch(authenticationHandler, authorizationHandler(roles.HR_ONLY), validationHandler(updateJobSchema), updateJob).delete(authenticationHandler, authorizationHandler(roles.HR_ONLY),validationHandler(deleteJobSchema), deleteJob)

export default router;
