
/**
 * @file src/helpers/createToken.js
 * @description create new JWT token
 */

import jwt from "jsonwebtoken";

const createToken = <T extends object>(data:T, options:jwt.SignOptions = {}) => {
    return jwt.sign(
        data,
        process.env.JWT_SECRET as string,
        options
    )
};

export default createToken;