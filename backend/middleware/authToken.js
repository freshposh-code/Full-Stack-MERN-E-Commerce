const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.REACT_VITE_APP_TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                })
            }

            req.userId = decoded?._id

            next()
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken;
