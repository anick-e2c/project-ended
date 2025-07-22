import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessagesAsSeen, SendMessage } from '../controllers/messageController.js';


const messageRouter = express.Router();

messageRouter.post('/users', protectRoute, getUsersForSidebar);
messageRouter.post('/:id', protectRoute, getMessages);
messageRouter.put('mark/:id', protectRoute, markMessagesAsSeen);
messageRouter.post('/send/:id', protectRoute, SendMessage);



export default messageRouter;
