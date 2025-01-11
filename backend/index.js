const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

const allowedOrigins = [
    'http://localhost:5173',  // Local development
    'https://poshstore.vercel.app', // Production frontend
];

app.use(cors({
    origin: (origin, callback) => {
        // Check if the incoming origin is in the allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
