import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import http from 'http';
import { connectBD } from './lib/db.js'; 
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';



// Create Express app and  HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

//  Store online users
export const userSocketMap = {}; // {userId: socketId}

// Socket.io disconnection handler
io.on("connection", (socket) =>{
     // Récupère l'userId depuis le handshake ou un event d'authentification
    const userId = socket.handshake.query.userId; // ou via un event personnalisé

    console.log("User Connected.", userId);

    if(userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
io.emit("getOnlineUsers", Object.keys(userSocketMap));


// Socket.io desconnection handler
socket.on("disconned", ()=>{
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
})
});




 
// Middleware setup
app.use(express.json({limit: '4mb'}));
app.use(cors());

// Routes setup
app.use('/api/status', (req, res)=>res.send("server is live"));
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter);

// connect to mongoDB
await connectBD();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost${PORT}`);
});