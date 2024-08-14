const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const allowedOrigins = [
    process.env.REACT_VITE_APP_FRONTEND_URL, // Local development URL
    'https://fullecommerceposhstore.vercel.app', // Production URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Handling preflight requests for all routes
app.options('*', cors());

app.use('/api', router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
});
