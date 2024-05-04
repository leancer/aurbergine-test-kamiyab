/**
 * @file api/user/index.js
 * @description root file for users routes
 */

import express, { Router } from "express";
import expressJoi from "express-joi-validation";
import userController from "./user.controller";
import userValidation from "./user.validation";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router:Router = express.Router();
const validator = expressJoi.createValidator({passError: true});


router.post(
    "/",
    isAuthenticated,
    validator.body(userValidation.create),
    userController.create
);

router.patch(
    "/:id",
    isAuthenticated,
    validator.params(userValidation.idPramas),
    validator.body(userValidation.update),
    userController.update
);

router.delete(
    "/:id",
    isAuthenticated,
    validator.params(userValidation.idPramas),
    userController.delete
);

router.get(
    "/",
    isAuthenticated,
    validator.query(userValidation.getQuery),
    userController.getAll
)

router.get(
    "/:id",
    isAuthenticated,
    validator.params(userValidation.idPramas),
    userController.getById
)

export default router;