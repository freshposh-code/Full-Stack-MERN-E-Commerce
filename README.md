🛍️ Full-Stack Ecommerce App

## Overview

This project is a full-stack ecommerce application built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [Node.js](https://nodejs.org/), and [MongoDB](https://www.mongodb.com/). The app is designed to provide a seamless shopping experience with an optimized front-end and robust back-end.

A full-featured e-commerce web application built with **React**, **MongoDB**, and **Node.js**. Includes authentication, product search, filtering, upload, cart functionality, and complete CRUD operations for both users and admins.

## 🚀 Features

- 🔐 **Authentication** (JWT-based login, signup, password hashing)
  
- 🛒 **Cart System** (add/remove/update items)
  
- 🔍 **Search & Filtering** by category, price, keyword
  
- 🧾 **Checkout Functionality** (payment integration |STRIPE|)
  
- 🧑‍💼 **Admin Controls** (CRUD on products, view orders, manage users)'
  
- 📸 **Product Upload** (with image support)
  
- 📦 **MongoDB Database** for all product/user/order data
  
- ⚙️ **REST API** built with Express

 **Responsive Design**: Fully responsive, ensuring a great user experience across all devices.
---

## 🧱 Tech Stack

| Tech        | Description                       |
|-------------|-----------------------------------|
| React       | Frontend library                  |
| Redux/Context | State management (optional)     |
| Express     | Backend framework (Node.js)       |
| MongoDB     | NoSQL database                    |
| Mongoose    | MongoDB object modeling           |
| JWT         | Authentication                    |
| Cloudinary | File/image upload support |


## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and running.
- Stripe account for payment processing.

### Backend Setup

1. Clone the repository:
    ```bash
    https://github.com/freshposh-code/Full-Stack-MERN-E-Commerce.git
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory.
    - Add the following variables:
      ```plaintext
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      STRIPE_SECRET_KEY=your_stripe_secret_key
      ```

4. Run the server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Visit `http://localhost:3000` in your browser to see the app in action.

## Usage

- **User Side**: Browse products, add items to the cart, and proceed to checkout.
- **Admin Side**: Log in to the admin dashboard to manage products and orders.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more details.

- **Permission**: You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
- **Condition**: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- **Limitation**: The software is provided "as is", without warranty of any kind.

## Acknowledgements

- **Vite**: For the fast and modern development environment.
- **React**: For the powerful and flexible front-end framework.
- **Node.js**: For the scalable and efficient back-end.
- **MongoDB**: For the robust and flexible database solution.
- **Stripe**: For the seamless payment processing integration.

## Contact

If you have any questions or feedback, feel free to reach out at [atomisefarouk919@gmail.com](mailto:atomisefarouk919@gmail.com).

