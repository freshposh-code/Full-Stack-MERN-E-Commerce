import { createBrowserRouter } from 'react-router-dom'
import App from '../src/App';
import Home from '../src/pages/Home'
import { AdminPanel, AllOrder, AllProducts, AllUsers, Cancel, Cart, CategoryProduct, ForgetPassword, Login, Order, ProductDetails, ResetPassword, SearchProduct, SignUp, Success } from '../src/pages';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: "all-order",
                        element: <AllOrder />
                    }
                ]
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "forgot-password",
                element: <ForgetPassword />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            },
            {
                path: "order",
                element: <Order />
            },
        ]
    }
]);

export default router;