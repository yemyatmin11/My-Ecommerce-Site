
const User = require("../models/User");

const CartController = {
    addToCart: async (req, res) => {
        try {
            const { userId, itemId } = req.body;
            const userData = await User.findById(userId);
            if(!userData) {
                return res.status(404).json({msg : 'User not found'})
            }

            let cartData = userData.cartData || {};

            if(!cartData[itemId]) {
                cartData[itemId] = 1
            }
            else {
                cartData[itemId] += 1
            }

            await User.findByIdAndUpdate(userId, {cartData})
            return res.json({ msg: 'Added to cart' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg: 'Error adding to cart' });
        }
    },
    removeFromCart: async (req, res) => {
        try {
            let { userId, itemId } = req.body;
            const userData = await User.findById(userId);

            if(!userData) {
                return res.status(404).json({msg : 'User not found'})
            }

            let cartData = userData.cartData || {};

            if(cartData[itemId] > 0) {
                cartData[itemId] -= 1
            }

            await User.findByIdAndUpdate(userId, {cartData})
            return res.json({msg : 'remove'})
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg: 'Error removing from cart' });
        }
    },
    getCart: async (req, res) => {
        try {
            let { userId } = req.body;
            let userData = await User.findById(userId);
            let cartData = userData.cartData;
            return res.json(cartData)
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg: 'Error getting from cart' });
        }
    }
};

module.exports = CartController;
