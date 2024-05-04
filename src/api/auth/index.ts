/**
 * @file api/user/index.js
 * @description root file for users routes
 */

import express, { Router } from "express";
import expressJoi from "express-joi-validation";
import authValidation from "./auth.validation";
import authController from "./auth.controller";

const router: Router = express.Router();
const validator = expressJoi.createValidator({ passError: true });


router.post(
    "/login",
    validator.body(authValidation.login),
    authController.login
);

export default router;