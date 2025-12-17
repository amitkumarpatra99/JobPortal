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

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes Placeholder
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/testserver', (req, res) => res.send('Server works directly'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
console.log('Mounting /api/users...');
app.use('/api/users', require('./routes/users'));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-portal';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
