import { Router } from "express";
import { signUp, signIn, getUserAccounts, getSpecificUserAccount, deleteAccount, updateAccount } from "../controllers/user.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
import validationHandler from "../middlewares/validation/validation.middleware.js";
import { signUpSchema, signInSchema, getAllUsersSchema, getSpecificUserSchema, updateUserSchema, deleteUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.route('/signup').post(validationHandler(signUpSchema), signUp);
router.route("/signin").post(validationHandler(signInSchema), signIn);
router
  .route("/")
  .get(validationHandler(getAllUsersSchema), getUserAccounts)
  .delete(authenticationHandler,validationHandler(deleteUserSchema), deleteAccount)
  .patch(authenticationHandler,validationHandler(updateUserSchema), updateAccount)
router.route("/:id").get(validationHandler(getSpecificUserAccount), getSpecificUserAccount)

export default router;