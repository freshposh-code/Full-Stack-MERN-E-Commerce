const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: function(origin, callback) {
        // Normalize origins by removing trailing slash if present
        const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        const allowedOrigins = [
            'http://localhost:5173',
            'https://poshstore.vercel.app'
        ];
        
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        } else {
            console.log("Blocked by CORS: ", origin);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
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