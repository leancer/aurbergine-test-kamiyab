/**
 * @file api/user/user.model.js
 * @description database model file for user
 */

import {Schema, model} from "mongoose";
import { TUser } from "./types";

const userSchema = new Schema<TUser>({
    first_name:{
        type: String,
        required: true,
    },
    last_name:String,
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone_no:{
        type:String,
        required: true,
    },
    gender:{ 
        type: String, 
        enum: ["male", "female", "other"], 
        required: true, 
    },
    address:{
        type: String,
        require:true
    },
    token:{
        type: String,
        default:"",
    },
    user_image_id:{
        type: Schema.Types.ObjectId,
        ref:"UserImage"
    }
},{ 
    timestamps:true
});

const User = model("User", userSchema);

export default User;