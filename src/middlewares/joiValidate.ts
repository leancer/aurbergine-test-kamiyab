/**
 * @file src/middlewares/joiValidate.js
 * @description middleware for joi validation
 */

import { NextFunction, Request, Response } from "express";
import { ExpressJoiError } from "express-joi-validation";

const joiValidate = (err:ExpressJoiError, req:Request, res:Response, next:NextFunction) => {
    if(err && err.error && err.error.isJoi){
        const errors = err.error.details || [];
        let errorMessage = errors.map(err => err.message).join(", ");
        errorMessage = errorMessage.replace(/"/g, "");
        errorMessage = errorMessage.replace("[", "");
        errorMessage = errorMessage.replace("]", "");
        return res.status(400).json({
          message: errorMessage,
        });
    }
    return next();
}

export default joiValidate;