import { Types } from "mongoose";

export declare type TGender = "male" | "female" | "other";

export declare type TUser = {
    id: Types.ObjectId;
    first_name:string,
    last_name?:string,
    email:string,
    password:string,
    phone_no:string,
    gender:TGender,
    address:string,
    token?:string,
    user_image_id?:Types.ObjectId
}