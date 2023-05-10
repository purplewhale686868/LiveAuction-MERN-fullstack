import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

export const uploadPicture = async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json(err);
  }
};
