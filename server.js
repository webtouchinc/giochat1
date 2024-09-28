const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from the 'public' folder

let userCount = 0;

io.on('connection', (socket) => {
    console.log('New user connected');
    userCount++;
    io.emit('userCount', userCount); // Notify all users of the current count

    socket.on('joinRoom', ({ roomId, username }) => {
        socket.join(roomId);
        socket.to(roomId).emit('message', {
            username: 'Server',
            text: `${username} has joined the chat!`
        });
    });

    socket.on('chatMessage', ({ roomId, username, message }) => {
        io.to(roomId).emit('message', { username, text: message });
    });

    socket.on('imageMessage', ({ roomId, imgData }) => {
        io.to(roomId).emit('message', {
            username: 'Image',
            text: `<img src="${imgData}" alt="Sent Image" style="max-width: 100%;">`
        });
    });

    socket.on('disconnectUser', ({ roomId, username }) => {
        socket.to(roomId).emit('message', {
            username: 'Server',
            text: `${username} has disconnected.`
        });
        userCount--;
        io.emit('userCount', userCount); // Update user count
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        userCount--;
        io.emit('userCount', userCount); // Update user count
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
