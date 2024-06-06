import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadFileOnCloud = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }
    // upload
    const response=await cloudinary.uploader
      .upload(
        filepath,{
            resource_type:"auto"
        }
      );
    console.log("file uploaded on cloudinary",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filepath);
    return null;
  }
};

export {uploadFileOnCloud}; 