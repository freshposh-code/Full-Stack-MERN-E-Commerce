import { createBrowserRouter } from 'react-router-dom'
import App from '../src/App';
import Home from '../src/pages/Home'
import { ForgetPassword, Login, SignUp } from '../src/pages';

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
                path: "forgot-password",
                element: <ForgetPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            // {
            //     path: "product-category",
            //     element: <CategoryProduct />
            // },
            // {
            //     path: "product/:id",
            //     element: <ProductDetails />
            // },
            // {
            //     path: 'cart',
            //     element: <Cart />
            // },
            // {
            //     path: "search",
            //     element: <SearchProduct />
            // },
            // {
            //     path: "admin-panel",
            //     element: <AdminPanel />,
            //     children: [
            //         {
            //             path: "all-users",
            //             element: <AllUsers />
            //         },
            //         {
            //             path: "all-products",
            //             element: <AllProducts />
            //         }
            //     ]
            // },
        ]
    }
]);

export default router;