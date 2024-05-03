/**
 * @file api/user/userImage.model.js
 * @description database model file for user images
 */

import {Schema, model} from "mongoose";
import { TUserImage } from "./types";

const userImageSchema = new Schema<TUserImage>({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    url_path:String,
},{ 
    timestamps:true
});

const UserImage = model("UserImage", userImageSchema);

export default UserImage;