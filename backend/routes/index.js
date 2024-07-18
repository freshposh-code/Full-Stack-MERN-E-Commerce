const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProductController = require('../controller/product/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetailsController = require('../controller/product/getProductDetails.js')
const addToCartController = require('../controller/user/addToCartController.js')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct.js')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct.js')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct.js')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct.js')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct.js')
const forgotPasswordController = require('../controller/user/forgotPasswordController.js');
const resetPasswordController = require('../controller/user/resetPasswordController.js');




router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get('/userLogout', userLogout);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

// ADMIN PANEL
router.get('/all-user', authToken, allUsers)
router.post('/update-user', authToken, updateUser)

// PRODUCT
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-product', getProductController)
router.post('/update-product', updateProductController)
router.get('/get-categoryProduct', getCategoryProductController)
router.post('/category-product', getCategoryWiseProduct)
router.post('/product-details', getProductDetailsController)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// CART
router.post('/addtocart', authToken, addToCartController)
router.get('/countAddToCartProduct', authToken, countAddToCartProduct)
router.get('/view-card-product', authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

module.exports = router