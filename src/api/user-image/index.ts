/**
 * @file api/user-image/index.js
 * @description root file for users images routes
 */

import express, { Router } from "express";
import expressJoi from "express-joi-validation";
import multer from "multer";
import userImageController from "./userImage.controller";
import userImageValidation from "./userImage.validation";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router:Router = express.Router();
const validator = expressJoi.createValidator({passError: true});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post(
    "/",
    isAuthenticated,
    upload,
    validator.body(userImageValidation.uploadFile),
    userImageController.uploadFile
);

export default router;