/**
 * @file src/helpers/responseObject.js
 * @description common helper function for response object
 */

import { Response } from "express";

type TStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;

type TResponseObject<T> = {
    status:TStatus,
    data:T | null,
    message:string,
}

const responseObject = <T>(res:Response,{status,data=null,message=''}:TResponseObject<T>) => {
    res.status(status).json({
        status:status,
        data:data || {},
        message:message,
    })
};

export default responseObject;