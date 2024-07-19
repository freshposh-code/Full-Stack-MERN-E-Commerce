const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.REACT_VITE_APP_EMAIL_AUTH,
        pass: process.env.REACT_VITE_APP_PASSWORD_AUTH
    },
});

module.exports = transporter;
