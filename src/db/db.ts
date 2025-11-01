import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("Please provide MONGO_URL in the environment variables");
        }
        await mongoose
            .connect(process.env.MONGO_URL as string)
            .then((connection) => {
                console.log("MongoDB connected");
            });
    } catch (error) {
        console.log("MongoDB connection error", error);
        throw error;
    }
};

export default connectDB;
