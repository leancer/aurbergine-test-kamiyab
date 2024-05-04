/**
 * @file api/user-image/userImage.controller.js
 * @description funcation controller for user image routes
 */

import { Response } from "express";
import responseObject from "../../helpers/responseObject";
import messages from "../../constants/messages";
import uploadImageToS3 from "../../helpers/uploadImageToS3";
import User from "../user/user.model";
import UserImage from "./userImage.model";
import { IRequest } from "../../middlewares/types";


export default {

    /**
     * @name uploadFile
     * @description creare a new user
     * @param req conatining http request
     * @param res conatining http response
     */
    uploadFile: async (req: IRequest, res: Response) => {

        try {
            const id = req.body.id;
            const file = req.file;

            //checking if file exist or not
            if(!file){
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.userFileRequired
                })
            }

            //checkig if user exists or not
            const isUserExist  = await User.findById(id);
            if (!isUserExist) {
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.userDoesNotExist
                })
            }

            //uploading file to s3
            let location =  await uploadImageToS3(file as Express.Multer.File);

            // saving in to userImage collection
            let userImage = new UserImage({
                user_id: id,
                url_path:location
            })
            userImage = await userImage.save();

            //updating the user
            await User.findByIdAndUpdate(id,{user_image_id:userImage.id});


            //get data from req.body
            return responseObject<string>(res, {
                status: 201,
                data: location,
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