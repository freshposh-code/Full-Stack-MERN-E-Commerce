const userModel = require('../../models/userModel');
const crypto = require('crypto');
const transporter = require('../../config/nodemailer');

async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `http://localhost:5173/reset-password?token=${token}`;

        const mailOptions = {
            from: process.env.REACT_VITE_APP_EMAIL_AUTH,
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset, You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process
        </p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>  If you did not request this, please ignore this email and your password will remain unchanged.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email', error: true, success: false });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Reset password email sent', success: true, error: false });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

module.exports = forgotPasswordController;
