import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default dbConnect;
