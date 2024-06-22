const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.role === 'ADMIN') {
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;  // Or handle the error in a way that suits your application's needs
    }
};

module.exports = uploadProductPermission;
