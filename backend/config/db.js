import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jkAdmin:StrongPass456@cluster0.qyecqgw.mongodb.net/FOOD-DEL').then(()=>console.log("DB Connected"));
}