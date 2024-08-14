const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express()
app.use(cors({
    origin: [
        process.env.REACT_VITE_APP_FRONTEND_URL, // Local development URL
        'https://poshstore.vercel.app', // Production URL (no trailing slash)
    ],
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

const PORT = 8080 || process.env.PORT


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connected to DB")
        console.log("Server is running " + PORT)
    })
})