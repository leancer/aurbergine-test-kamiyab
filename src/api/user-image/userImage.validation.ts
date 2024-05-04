/**
 * @file api/user-image/userImage.validation.js
 * @description validation schema for user routes
 */

import Joi from "joi";

export default {
    uploadFile: Joi.object({
        id: Joi.string().required(),
    }),
}