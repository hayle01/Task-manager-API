import User from "../models/users.js";
import { generateToken } from "../utils/generateToken.js";

// Register new user
export const registerUser = async (req, res, next) => {
    let { name, email, password, role} = req.body;
    try {
        email = email.toLowerCase();
        const exists = await User.findOne( { email});
        if(exists) return res.status(400).json({ message: 'Email already in use'});
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        console.log('User registered:', user);

        // generate token
        const token = generateToken(user._id);
        res.status(201).json({ token, user})
    } catch (error) {
        next(error)
    }
}

// login user
export const login = async (req, res, next) => {
    let { email, password} = req.body;
    try {
        email = email.toLowerCase();
        console.log(email, password);
        const user = await User.findOne({ email });
        if(!user || !(user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }
        console.log('User logged in:', user);
        // generate token
        const token = generateToken(user._id);
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}