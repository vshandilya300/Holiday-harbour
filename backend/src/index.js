import dotenv from 'dotenv';
import path from "path"

import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { cookie } from 'express-validator';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import myHotelRoutes from "./routes/my-hotels.js"
import hotelRoutes from "./routes/hotels.js"
import bookingRoutes from "./routes/my-bookings.js"
import dbConnect from "./config/db.js"
import cloudinaryConfig from './config/cloudinary.js';

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
import crypto from 'crypto';

const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dbConnect();
cloudinaryConfig();

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(
    cors({
      origin: "https://holiday-harbour-git-main-vshandilya300s-projects.vercel.app",
      credentials: true,
    })
  );

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
