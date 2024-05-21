const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variable for the secret key

app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// In-memory storage for users (replace with a database in production)
let users = [];

// Sign-in endpoint
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ success: true, message: 'Sign-in successful', token });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

// Sign-up endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        res.json({ success: false, message: 'Email already exists' });
    } else {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.json({ success: false, message: 'Error hashing password' });
            } else {
                users.push({ username, email, password: hash });
                res.json({ success: true, message: 'Sign-up successful' });
            }
        });
    }
});

// Password recovery endpoint
app.post('/api/recover', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        // In a real application, send an email to the user with a recovery link or code
        res.json({ success: true, message: 'Password recovery email sent' });
    } else {
        res.json({ success: false, message: 'Email not found' });
    }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Fallback to index.html for all other routes (to support client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
