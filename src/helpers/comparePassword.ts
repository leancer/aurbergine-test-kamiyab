/**
 * @file src/helpers/passwordHash.js
 * @description password hash with bycrpt
 */
import bcrypt from "bcrypt";

const comparePassword = async (password: string, hashPasswod: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPasswod);
};

export default comparePassword;