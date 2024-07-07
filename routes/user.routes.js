import { Router } from "express";
import { signUp, signIn, getUserAccounts, getSpecificUserAccount } from "../controllers/user.controllers.js";


const router = Router();


router.route('/signup').post(signUp);
router.route("/signin").post(signIn);
router.route("/").get(getUserAccounts);
router.route("/:id").get(getSpecificUserAccount);

export default router;