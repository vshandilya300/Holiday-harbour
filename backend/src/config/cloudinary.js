import {v2 as cloudinary} from "cloudinary"

const cloudinaryConfig = async () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Connected to Cloudinary");
    }catch(error){
        console.error("Cloudinary connection error:", error);
        process.exit(1);
    }
};

export default cloudinaryConfig;
