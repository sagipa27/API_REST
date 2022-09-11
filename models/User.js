import mongoose from "mongoose";
const { Schema, model } = "mongoose";


const userSchema = new Schema({
    email: {
        type: string,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: string,
        required: true,
    }
});


export const user = model('user', userSchema);