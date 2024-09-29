const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ChatEngine = require('chat-engine');
const cors = require('cors');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use CORS to allow cross-origin requests
app.use(cors());

// Environment Variables (replace these with your actual keys if needed)
const PROJECT_ID = process.env.ANONYMCHAT_CHATENGINE_PROJECT_ID || 'bef1944a-9499-4d8f-988f-ad3314037515';
const PRIVATE_KEY = process.env.ANONYMCHAT_CHATENGINE_PRIVATE_KEY || 'a6b7fe8e-1d85-45e3-9424-8e2f129a9aea';

// Create ChatEngine instance
const chatEngine = new ChatEngine({
    projectId: PROJECT_ID,
    privateKey: PRIVATE_KEY,
});

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining a chat room
    socket.on('join', (data) => {
        const { roomId, username } = data;
        socket.join(roomId);
        socket.to(roomId).emit('message', { username, text: `${username} has joined the chat.` });
    });

    // Handle incoming messages
    socket.on('message', (data) => {
        const { roomId, username, text } = data;
        socket.to(roomId).emit('message', { username, text });
    });

    // Handle disconnecting
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
