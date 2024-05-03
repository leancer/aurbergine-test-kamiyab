import { Types } from "mongoose";


export type TUserImage = {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    url_path:string,
}