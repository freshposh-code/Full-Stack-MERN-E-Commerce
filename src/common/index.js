const backendDomain = import.meta.env.VITE_APP_BACKEND_URL;

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: 'post'
    },
    forgetPassword: {
        url: `${backendDomain}/api/forgot-password`,
        method: 'post'
    },
    resetPassword: {
        url: `${backendDomain}/api/reset-password`,
        method: 'post'
    },
    payment: {
        url: `${backendDomain}/api/checkout`,
        method: 'post'
    },
    getOrder: {
        url: `${backendDomain}/api/order-list`,
        method: 'get'
    },
    allOrder: {
        url: `${backendDomain}/api/all-order`,
        method: 'get'
    },
}


export default SummaryApi