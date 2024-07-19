const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function resetPasswordController(req, res) {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            throw new Error("Invalid or missing token");
        }
        if (!newPassword) {
            throw new Error("Please provide a new password");
        }

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully', success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

module.exports = resetPasswordController;
