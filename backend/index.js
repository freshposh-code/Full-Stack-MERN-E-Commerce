const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

// Custom CORS middleware to manually set headers
app.use((req, res, next) => {
    const allowedOrigins = [
        process.env.REACT_VITE_APP_FRONTEND_URL, // Local development URL
        'https://poshstore.vercel.app'           // Production URL
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Intercept OPTIONS method to respond with 200
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
