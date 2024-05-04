/**
 * @file api/user/user.controller.js
 * @description funcation controller for user routes
 */

import { Request, Response } from "express";
import { TUser } from "./types";
import User from "./user.model";
import responseObject from "../../helpers/responseObject";
import passwordHash from "../../helpers/passwordHash";
import { omit } from "radash";
import messages from "../../constants/messages";


export default {
    
    /**
     * @name create
     * @description creare a new user
     * @param req conatining http request
     * @param res conatining http response
     */
    create: async (req:Request, res:Response) => {

        try {
            
            //get data from req.body
            let reqData:Omit<TUser,"_id"> = req.body;
    
            //check if same email is exist in database or not
            const isEmailExist = await User.findOne({ email:reqData.email});
            if(isEmailExist) {
                return responseObject(res,{
                    status:400,
                    data:null,
                    message:messages.emailAlreadyExists
                })
            }
    
            //hash the password
            const hashPassword = await passwordHash(reqData.password);
            reqData.password = hashPassword;
            
            //save user to database
            let user = new User(reqData);
            user = await user.save();

            //omiting the password in response
            let userWithoutPassword = omit(user.toJSON(),["password"]);
    
            return responseObject<Omit<TUser,"password">>(res, {
                status:201,
                data:userWithoutPassword,
                message:messages.userSavedSuccessfully
            })
        } catch (error) {
            console.log("🚀 ~ error:", error)
            return responseObject(res,{
                status:500,
                data:null,
                message:messages.somethingWentWrong
            })
        }

    },
}