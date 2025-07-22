import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import http from 'http';
import { connectBD } from './lib/db.js'; 


// Create Express app and  HTTP server
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(express.json({limit: '4mb'}));
app.use(cors());


app.use('/api/status', (req, res)=>res.send("server is live"));

// connect to mongoDB
await connectBD();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});