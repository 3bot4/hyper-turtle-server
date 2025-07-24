const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.send('Hyper Turtle Server');
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (data) => {
        socket.username = data.username; // Store username on socket
    });

    socket.on('message', (data) => {
        io.emit('message', {
            username: data.username,
            message: data.message
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
