import mongoose from "mongoose";

export const db = () => {
    mongoose.connect(process.env.MONGODB_URL as string)
        .then(() => {
            console.log("Database connection established")
        })
        .catch((error) => {
            console.error("Error connecting to Mongo", error);
        })
}