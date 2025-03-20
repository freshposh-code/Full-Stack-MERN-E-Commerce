const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            };

            // For regular browsers, set the cookie
            res.cookie("token", token, tokenOption);

            // Return response with token that frontend can use for Safari
            return res.status(200).json({
                message: "Login successfully",
                data: {
                    user: {
                        _id: user._id,
                        email: user.email,
                        // Include other non-sensitive user data you need
                    }
                },
                token: token, // Explicitly include token for Safari to store in localStorage
                success: true,
                error: false
            });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
