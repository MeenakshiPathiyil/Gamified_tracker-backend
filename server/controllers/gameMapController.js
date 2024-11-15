// const GameMap = require('../models/gameMap');

// exports.getgameMap = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const gameMap = await GameMap.findOne({ userId });

//         if (!gameMap) {
//             return res.status(404).json({ message: 'game map not found' });
//         }

//         res.status(200).json(gameMap);
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Error retrieving game map', error: error.message });
//     }
// };

// exports.updateGameMap = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { houses } = req.body;

//         const updatedGameMap = await GameMap.findOneAndUpdate(
//             {userId}, 
//             { $set: { houses } },
//             { new: true }
//         );

//         if (!updatedGameMap) {
//             return res.status(404).json({ message: 'Game map not found' });
//         }

//         res.status(200).json(updatedGameMap);
//     }
//     catch(error) {
//         res.status(500).json({ message: 'Error updating game map', error: error.message });
//     }
// };

// exports.addItemToHouse = async (req, res) => {
//     try {
//         const {userId} = req.params;
//         const { houseId, itemId, position }= req.body;

//         const gameMap = await GameMap.findOne({ userId });
//         if (!gameMap) {
//             return res.status(404).json({ message: 'Game map not found' });
//         }

//         const house = gameMap.houses.find((h) => h.houseId === houseId);
//         if (!house) {
//             return res.status(404).json({ message: 'House not found' });
//         }

//         house.items.push({ itemId, position });

//         await gameMap.save();
//         res.status(200).json({ message: 'Item added successfully', gameMap });
//     }
//     catch (error) {
//         res.staus(500).json({ message: 'Error adding item to house', error: error.message});
//     }
// };