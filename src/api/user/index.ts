/**
 * @file api/user/index.js
 * @description root file for users routes
 */

import express,{Request, Response, Router} from "express";
import expressJoi from "express-joi-validation";
import userController from "./user.controller";
import userValidation from "./user.validation";

const router:Router = express.Router();
const validator = expressJoi.createValidator({passError: true});

router.get("/", (req:Request, res:Response) => {
    return res.send("users");
})

router.post(
    "/",
    validator.body(userValidation.create),
    userController.create
)

export default router;