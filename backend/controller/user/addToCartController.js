const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId; // Assuming req.userId is set correctly

        // Check if the product already exists in the current user's cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in the cart",
                success: false,
                error: true
            });
        }

        // If not, add the product to the cart
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to cart",
            success: true,
            error: false
        });
    } catch (err) {
        return res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
