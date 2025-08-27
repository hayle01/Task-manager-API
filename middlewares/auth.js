import User from "../models/users.js";
import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    if(!token) return res.status(401).json({message: "No token provided"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);
        req.user = await User.findById(decoded.id).select('-password');
        console.log('User:', req.user);
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"})
    }
}