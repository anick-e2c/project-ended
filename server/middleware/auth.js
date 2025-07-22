import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const protectRoutes = async (req, res, next)=>{
    try {
        token = req.headers.token;

        // decoder et find the user joint of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(401).json({success: false, message: "User not find"});

        req.user = user

    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({success: false, message: error.message});
    }
}