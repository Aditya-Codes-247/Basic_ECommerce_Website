const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); 
});
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});
app.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'msgs.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html')); 
});
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    console.log('Received signup request:');
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    res.redirect('/');
});
app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const isValidLogin = true; 
    if (isValidLogin) {
        res.redirect('/'); 
    } else {
        res.status(401).send('Invalid credentials');
    }
});
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
