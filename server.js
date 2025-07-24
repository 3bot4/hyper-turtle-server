const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' } // Adjust CORS for your client URL
});

let connectedUsers = 0;

io.on('connection', (socket) => {
    connectedUsers++;
    io.emit('onlineCount', connectedUsers); // Broadcast updated count to all clients

    socket.on('join', (data) => {
        socket.username = data.username;
        console.log(`${socket.username} joined`);
    });

    socket.on('message', (data) => {
        io.emit('message', data); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        connectedUsers--;
        io.emit('onlineCount', connectedUsers); // Broadcast updated count on disconnect
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
