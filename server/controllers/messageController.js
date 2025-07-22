import Message from '../models/Message.js';
import User from '../models/User.js';


// Get all users except the logged in user
export const getUsersForSidebar = async (req, res)=>{
    try {
        const userId =req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // Count number of messages not seen
        const unSeenMessages ={};
        const promises = filteredUsers.map(async (user)=>{
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})

            if(messages.length > 0){
                unSeenMessages[user._id] = messages.length
            }
        })
        // promises done
        await Promise.all(promises);
        res.status(201).json({success: true, users: filteredUsers, unSeenMessages});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: filteredUsers, unSeenMessages})
    }
}

// Get all messages for selected user
export const getMessages = async (req, res)=>{
    try {
        const {id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        
        await Message.updateMany({senderId: selectedUserId, receiverId:myId}, {seen: true});
        res.status(201).json({success: true, messages})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: filteredUsers, unSeenMessages})
    }
}

// Api to mark message as seen using message id
export const markMessagesAsSeen = async (req, res)=>{
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.status(201).json({success: true})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: filteredUsers, unSeenMessages})
    }
}