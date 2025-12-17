const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const fs = require('fs');
const path = require('path');

app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFileSync(path.join(__dirname, 'debug.log'), log);
    next();
});

// Routes Placeholder
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-portal';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
