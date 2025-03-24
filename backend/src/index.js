import dotenv from 'dotenv';
import path from "path"

import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { cookie } from 'express-validator';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {v2 as cloudinary} from "cloudinary"
import myHotelRoutes from "./routes/my-hotels.js"
import hotelRoutes from "./routes/hotels.js"
import bookingRoutes from "./routes/my-bookings.js"

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDB();

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors(
));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/my-hotels",myHotelRoutes)
app.use("/api/hotels",hotelRoutes)
app.use("/api/my-bookings",bookingRoutes)



app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})
 

app.listen(7000, ()=>{
    console.log("server is running on localhost 7000")
});
