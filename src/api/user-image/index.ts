/**
 * @file api/user-image/index.js
 * @description root file for users images routes
 */

import express,{Request, Response, Router} from "express";
import expressJoi from "express-joi-validation";
import multer from "multer";
import userImageController from "./userImage.controller";
import userImageValidation from "./userImage.validation";

const router:Router = express.Router();
const validator = expressJoi.createValidator({passError: true});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post(
    "/",
    upload,
    validator.body(userImageValidation.uploadFile),
    userImageController.uploadFile
);

export default router;