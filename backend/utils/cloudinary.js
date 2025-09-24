import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.COLUDINARY_CLOUD_NAME_NM,
    api_key: process.env.CLOUDINARY_API_KEY_KY,
    api_secret: process.env.CLOUDINARY_API_SECRET_SE
})

export default cloudinary;