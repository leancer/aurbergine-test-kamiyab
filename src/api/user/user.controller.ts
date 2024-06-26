/**
 * @file api/user/user.controller.js
 * @description funcation controller for user routes
 */

import { Response } from "express";
import { TUser } from "./types";
import User from "./user.model";
import responseObject from "../../helpers/responseObject";
import passwordHash from "../../helpers/passwordHash";
import { omit } from "radash";
import messages from "../../constants/messages";
import { IRequest } from "../../middlewares/types";


export default {

    /**
     * @name create
     * @description creare a new user
     * @param req conatining http request
     * @param res conatining http response
     */
    create: async (req: IRequest, res: Response) => {

        try {

            //get data from req.body
            let reqData: Omit<TUser, "id"> = req.body;

            //check if same email is exist in database or not
            const isEmailExist = await User.findOne({ email: reqData.email });
            if (isEmailExist) {
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.emailAlreadyExists
                })
            }

            //hash the password
            const hashPassword = await passwordHash(reqData.password);
            reqData.password = hashPassword;

            //save user to database
            let user = new User(reqData);
            user = await user.save();

            //omiting the password in response
            let userWithoutPassword = omit(user.toJSON(), ["password"]);

            return responseObject<Omit<TUser, "password">>(res, {
                status: 201,
                data: userWithoutPassword,
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

    /**
     * @name update
     * @description creare a update user properties
     * @param req conatining http request
     * @param res conatining http response
     */
    update: async (req: IRequest, res: Response) => {

        try {
            let id: string = req.params.id
            //get data from req.body
            let reqData: Partial<Omit<TUser, "id">> = req.body;

            //check if user exist on proverd id
            const isUserExist = await User.findById(id);
            if (!isUserExist) {
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.userDoesNotExist
                })
            }

            //check if same email is exist in database or not
            if (reqData.email) {
                const isEmailExist = await User.findOne({ email: reqData.email, id: { $ne: id } });
                if (isEmailExist) {
                    return responseObject(res, {
                        status: 400,
                        data: null,
                        message: messages.emailAlreadyExists
                    })
                }
            }

            //update user to database
            let updateduser = await User.findByIdAndUpdate(id, { ...reqData }, { new: true }).select(["-password"]).populate("user_image_id");


            return responseObject<Omit<TUser, "password">>(res, {
                status: 200,
                data: updateduser,
                message: messages.userUpdatedSuccessfully
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

    /**
     * @name delete
     * @description delete a user by id
     * @param req conatining http request
     * @param res conatining http response
     */
    delete: async (req: IRequest, res: Response) => {

        try {
            let id: string = req.params.id

            //check if user exist on proverd id
            const isUserExist = await User.findById(id);
            if (!isUserExist) {
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.userDoesNotExist
                })
            }

            //delete user to database
            await User.findByIdAndDelete(id);

            return responseObject<string>(res, {
                status: 200,
                data: id,
                message: messages.userDeletedSuccessfully
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

    /**
     * @name getById
     * @description creare a user by Id
     * @param req conatining http request
     * @param res conatining http response
     */
    getById: async (req: IRequest, res: Response) => {

        try {
            let id: string = req.params.id;

            //check if user exist on proverd id
            const isUserExist = await User.findById(id);
            if (!isUserExist) {
                return responseObject(res, {
                    status: 400,
                    data: null,
                    message: messages.userDoesNotExist
                })
            }


            //update user to database
            let user = await User.findById(id).select(["-password"]).populate("user_image_id");


            return responseObject<Omit<TUser, "password">>(res, {
                status: 200,
                data: user,
                message: messages.userFetchSuccessfully
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

    /**
     * @name getAll
     * @description creare a user by Id
     * @param req conatining http request
     * @param res conatining http response
     */
    getAll: async (req: IRequest, res: Response) => {

        try {
            const page = +(req.query.page || 1);
            const limit = +(req.query?.limit || 10);
            const skip = (page - 1) * limit;
            

            //update user to database
            let users = await User.find({}).skip(skip).limit(limit).sort("-createdAt").select(["-password"]).populate("user_image_id");


            return responseObject<Omit<TUser[], "password">>(res, {
                status: 200,
                data: users,
                message: messages.usersFetchSuccessfully
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