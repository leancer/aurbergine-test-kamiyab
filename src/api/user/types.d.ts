import { Types } from "mongoose";

export declare type TGender = "male" | "female" | "other";

export type TUser = {
    _id: Types.ObjectId;
    first_name:string,
    last_name?:string,
    email:string,
    password:string,
    phone_no:number,
    gender:TGender,
    address:string,
    user_image_id?:Types.ObjectId
}