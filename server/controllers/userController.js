import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';



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
export const sign = async (req, res)=>{
    
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