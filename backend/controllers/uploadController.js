import cloudinary from '../utils/cloudinary.js';
import User from '../models/users.js';

export const uploadFile = (req, res, next) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', resource_type: 'auto'},
        async (error, result) => {
            if(error){
                next(error)
            }
            await User.findByIdAndUpdate(req.user._id, {profile: result.secure_url});
            return res.status(201).json({
                success: true, 
                fileUrl: result.secure_url
            })
        }
    )
    stream.end(req.file.buffer);
}