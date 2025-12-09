import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/blog");
        await mongoose.connect("mongodb+srv://mern_udemy:Mky67nWqN0omkrZ2@cluster0.coehnnm.mongodb.net/NotJustBlog");
        console.log("🔥 MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
