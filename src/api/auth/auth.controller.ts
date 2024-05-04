/**
 * @file api/user-image/userImage.controller.js
 * @description funcation controller for user image routes
 */

import { Response } from "express";
import responseObject from "../../helpers/responseObject";
import messages from "../../constants/messages";
import { IRequest } from "../../middlewares/types";
import User from "../user/user.model";
import comparePassword from "../../helpers/comparePassword";
import createToken from "../../helpers/createToken";
import { TUser } from "../user/types";


export default {

    /**
     * @name login
     * @description creare a new user
     * @param req conatining http request
     * @param res conatining http response
     */
    login: async (req: IRequest, res: Response) => {

        try {

            let reqData = req.body;

            //find if the user exists with the right email
            const user = await User.findOne({email:reqData.email}) as TUser;
            if(!user){
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.incorrectEmailPassord
                })
            };

            //compare password with the hash password
            const isValidPassword = await comparePassword(reqData.password,user.password);
            if(!isValidPassword){
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.incorrectEmailPassord
                })
            };

            //create the Token
            const token  = createToken({id:user.id},{expiresIn:"24h"});

            //update user with token to database
            let updateduser = await User.findByIdAndUpdate(user.id, { token }, { new: true }).select(["-password"]).populate("user_image_id");
            
            //get data from req.body
            return responseObject<Omit<TUser, "password">>(res, {
                status: 201,
                data: updateduser,
                message: messages.userSavedSuccessfully
            })
        } catch (error) {
            console.log("🚀 ~ error:", error)
            return responseObject(res, {
                status: 500,
                data: null,
                message: messages.somethingWentWrong
            })
        }

    },
}