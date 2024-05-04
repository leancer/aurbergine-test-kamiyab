/**
 * @file api/index.js
 * @description all modules entryroutes 
 */

import express,{Router} from "express";
import userRouter from "./user"
import userImageRouter from "./user-image"
import authRouter from "./auth"

const router:Router = express.Router();

router.use("/auth",authRouter);
router.use("/user",userRouter);
router.use("/file",userImageRouter);

export default router;