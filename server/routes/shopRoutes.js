const express = require('express');
const shopRouter = express.Router();
const User = require('../models/userModel');

shopRouter.post('/purchase', async (req, res) => {
    const userId = req.session.userId; 
    const { purchasedItem } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!purchasedItem) {
        return res.status(400).json({ message: 'Purchased item is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.purchasedItems.push(purchasedItem); 
        await user.save();

        res.status(200).json({ message: 'Item purchased successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error processing purchase', error });
    }
});


module.exports = shopRouter;
