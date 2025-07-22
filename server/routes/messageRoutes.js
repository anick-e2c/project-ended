import express from 'express';
import { protectRoutes } from '../middleware/auth';
import { getMessages, getUsersForSidebar, markMessagesAsSeen } from '../controllers/messageController.js';


const messageRouter = express.Router();

messageRouter.post('/users', protectRoutes, getUsersForSidebar);
messageRouter.post('/:id', protectRoutes, getMessages);
messageRouter.put('mark/:id', protectRoutes, markMessagesAsSeen);



export default messageRouter;
