// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the path module to work with file paths

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (such as HTML, CSS, and JavaScript) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve the socket.io.js file from the node_modules directory
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ConnecShopPrototype', 'home.html')); // Serve the home.html file
});

// Route for the search page
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html')); // Serve the search.html file
});

// Route for the cart page
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html')); // Serve the cart.html file
});

// Route for the messages page
app.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'messages.html')); // Serve the messages.html file
});

// Route for the profile page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html')); // Serve the profile.html file
});

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
