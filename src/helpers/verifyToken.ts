
/**
 * @file src/helpers/verifyToken.js
 * @description verify JWT token
 */

import jwt from "jsonwebtoken";

type TJWTPayload = {
    id?:string
}

const verifyToken = (token:string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string,
    ) as TJWTPayload;
};

export default verifyToken;