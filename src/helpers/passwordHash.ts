/**
 * @file src/helpers/passwordHash.js
 * @description password hash with bycrpt
 */
import bcrypt from "bcrypt";

const passwordHash = async (password:string):Promise<string> => {
    let hashPassword = await bcrypt.hash(password,10);
    return hashPassword;
};

export default passwordHash;