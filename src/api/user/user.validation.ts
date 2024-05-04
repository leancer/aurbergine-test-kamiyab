/**
 * @file api/user/user.validation.js
 * @description validation schema for user routes
 */

import Joi from "joi";
import { PASSWORD_REGEX } from "../../constants";

export default {
    create: Joi.object({
        first_name: Joi.string().min(3).trim(true).required(),
        last_name: Joi.string().trim(true).empty().min(3).default(""),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(30).pattern(PASSWORD_REGEX).required(),
        phone_no:Joi.string().length(10).pattern(/^\d+$/).required(),
        gender: Joi.string().valid("male","female","others").required(),
        address: Joi.string().trim(true).empty().default("")
    })
}