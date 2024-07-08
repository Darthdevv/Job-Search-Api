import { Router } from "express";
import { signUp, signIn, getUserAccounts, getSpecificUserAccount, deleteAccount, updateAccount } from "../controllers/user.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";


const router = Router();


router.route('/signup').post(signUp);
router.route("/signin").post(signIn);
router
  .route("/")
  .get(getUserAccounts)
  .delete(authenticationHandler, deleteAccount)
  .patch(authenticationHandler, updateAccount)
router.route("/:id").get(getSpecificUserAccount)

export default router;