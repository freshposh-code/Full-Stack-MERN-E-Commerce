const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://poshstore.vercel.app'
        ];

        if (!origin || allowedOrigins.includes(origin) || 
            allowedOrigins.includes(origin.endsWith('/') ? origin.slice(0, -1) : origin)) {
            return callback(null, true);
        } else {
            console.log("Blocked by CORS: ", origin);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api",router);

const PORT = 8080 || process.env.PORT    


connectDB().then(() =>{
    app.listen(PORT,() =>{
        console.log("connnect to DB")
        console.log("Server is running on PORT " +PORT)
    });
});