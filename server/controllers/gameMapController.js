// const User = require('../models/userModel');
// const Item = require('../models/Item');
// const House = require('../models/House');

// const getGameState = async (req, res) => {
//     try {
//         const user = await User.findById(req.session.userId)
//             .populate('unlockedHouses')
//             .populate('unlockedItems')
//             .populate('placedItems.item');

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             coins: user.coins,
//             points: user.points,
//             unlockedHouses: user.unlockedHouses,
//             unlockedItems: user.unlockedItems,
//             placedItems: user.placedItems
//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const purchaseItem = async (req, res) => {
    const { itemId } = req.body;
    const user = await User.findById(req.session.userId);

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).send({ message: 'Item not found' });
    }

    if (user.coins < item.cost) {
        return res.status(400).send({ message: 'Insufficient coins' });
    }

    user.coins -= item.cost;
    user.unlockedItems.push(itemId);
    await user.save();

    res.send({ message: 'Item purchased successfully', coins: user.coins });
};


// const placeItem = async (req, res) => {
//     try {
//       const { itemId, position } = req.body;
//       const user = await User.findById(req.session.userId);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       if (!user.unlockedItems.includes(itemId)) {
//         return res.status(400).json({ message: 'Item not unlocked' });
//       }
  
//       user.placedItems.push({ item: itemId, position });
//       await user.save();
  
//       res.status(200).json({ message: 'Item placed successfully', user });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };
  
//   module.exports = { getGameState, purchaseItem, placeItem };