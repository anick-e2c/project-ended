import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/coudinary.js";


// Signup a new user
export const signup = async (req, res)=>{
    const {fullName, email, password, bio} = req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.status(401).json({success: false, message: "Missing Details"});
        }
        // verify user
        const user = User.findOne({email});
        
        if (user){
            return res.status(401).json({success: false, message: "Account Already exists"});
        }

        // Cryptage password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            fullName, email, hashedPassword, bio
        });

        // getting a new token and save a new user
        const token = generateToken(newUser._id);

        res.status(201).json({success: true, userData: newUser, message: "Account created succeful"});

    } catch (error) {
        console.log(error.message);       
        res.status(500).json({success: false,  message: error.message}); 
    }
};

// Controller to login a user
export const login = async (req, res)=>{
    
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({email});
        const isPassworCorrect = bcrypt.compare(password, userData.password);

        if(!isPassworCorrect){
            return res.status(401).json({success: false,  message: "Invalid credentials"});
        }

        const token = generateToken(userData._id);

        res.status(201).json({success: true, userData: token, message: "Login succeful!"});

    } catch (error) {
        console.log(error.message);       
        res.status(500).json({success: false,  message: error.message}); 
    }
};

// Controller to check if user is authentificated
export const checkAuth = (req, res)=>{
    res.status(201).json({success: true, user: req.user})
}

// Controller to update user profile details
export const updateProfile =async (req, res)=>{
    try {
        const { profilePic, bio ,fullName } = req.body;
        const userId = req.User_id;

        let updatedUser ;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName},{ new: true})
        } else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, 
                bio, fullName}, {new: true});
        }

        res.status(201).json({success: true, userData: updatedUser, message: "Profile updated successfully!"});
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({success: false, message: error.message});
    }
}