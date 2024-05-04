/**
 * @file api/user/user.validation.js
 * @description validation schema for user routes
 */

import Joi from "joi";
import { PASSWORD_REGEX } from "../../constants";

export default {
    login: Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(30).pattern(PASSWORD_REGEX).required(),
    }),
}