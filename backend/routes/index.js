const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")



router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)

module.exports = router