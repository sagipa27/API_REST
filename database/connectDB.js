import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.vadxztc.mongodb.net/DBApi");
    console.log("Connect DB OK");
} catch (error) {
    console.log("Error conecction to MongoDB:" + error.message);
}
