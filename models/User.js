import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

//se crea el esquema del usuario
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

//Se ejecuta antes de guardar el usuario en donde se ecripta la contraseña
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");

    }
});

//Metodo para comparar la contraseña que el usuario introdujo y la que esta encriptada en la base de datos 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password)
};

//Se exporta el userSchema para ser usado en otros documentos 
export const User = mongoose.model("User", userSchema);