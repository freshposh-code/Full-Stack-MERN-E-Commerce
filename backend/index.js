const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

// List of allowed origins
const allowedOrigins = [
    process.env.REACT_VITE_APP_FRONTEND_URL, // Local development URL
    'https://fullecommerceposhstore.vercel.app', // Production URL
    'https://poshstore.vercel.app', // Another Production URL if applicable
    'https://poshstore1.vercel.app', // Corrected Production URL if applicable
];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow requests with no origin, like mobile apps or curl requests
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Handling preflight requests
app.options('*', cors());

app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
