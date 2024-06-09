const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')

require('dotenv').config();



const app = express()
app.use(cors(
    {
        origin: 'http://localhost:5173', // Specify the frontend URL
        credentials: true,               // Allow credentials (cookies, HTTP auth)
    }
))
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