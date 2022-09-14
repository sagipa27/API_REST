import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    if (!user.isModified('password')) return next();
    try {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                // Store hash in your password DB.
                user.password = hash;
            });
        });
    } catch (error) {
        console.log(error);
        throw new Error('fallo el hash de contraseña');
    }
});
export const user = model('user', userSchema);