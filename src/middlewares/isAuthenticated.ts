/**
 * @file src/middlewares/joiValidate.js
 * @description middleware for joi validation
 */

import { NextFunction, Response } from "express";
import responseObject from "../helpers/responseObject";
import messages from "../constants/messages";
import verifyToken from "../helpers/verifyToken";
import User from "../api/user/user.model";
import { TUser } from "../api/user/types";
import { IRequest } from "./types";

const isAuthenticated = async (req: IRequest, res: Response, next: NextFunction) => {
    // taking token from request
    const authorization = req.header('authorization');
    if (!authorization) {
        return responseObject(res, {
            status: 401,
            data: null,
            message: messages.missingAuthToken
        })
    }

    //split bearer token
    const token = authorization.split(' ')[1];

    //decoding the token
    const decodedToken = verifyToken(token);

    if (!decodedToken?.id) {
        return responseObject(res, {
            status: 401,
            data: null,
            message: messages.badToken
        })
    }

    const user = await User.findById(decodedToken?.id);
    if (!user) {
        return responseObject(res, {
            status: 401,
            data: null,
            message: messages.badToken
        })
    }

    req.user = user as TUser;

    return next();
}

export default isAuthenticated;