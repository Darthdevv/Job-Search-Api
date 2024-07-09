import { Router } from "express";
import { signUp, signIn, getUserAccounts, getSpecificUserAccount, deleteAccount, updateAccount } from "../controllers/user.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import validationHandler from "../middlewares/validation/validation.middleware.js";
import { signUpSchema, getAllUsersSchema, getSpecificUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.route('/signup').post(validationHandler(signUpSchema), signUp);
router.route("/signin").post(signIn);
router
  .route("/")
  .get(validationHandler(getAllUsersSchema), getUserAccounts)
  .delete(authenticationHandler, deleteAccount)
  .patch(authenticationHandler, updateAccount)
router.route("/:id").get(validationHandler(getSpecificUserAccount), getSpecificUserAccount)

export default router;