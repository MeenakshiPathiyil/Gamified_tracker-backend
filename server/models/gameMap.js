// const mongoose = require('mongoose');

// const gameMapSchema = new mongoose.Schema({ 
//     userid: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     houses: [
//         {
//             houseId: { type: String, required: true },
//             position: { type: String, required: true },
//             isLocked: { type: Boolean, default: true },
//             items: [
//                 {
//                     itemId: { type: String, required: true },
//                     pposition: { type: String, required: true }
//                 }
//             ]
//         }

//     ],
//     ceratedAt: { type: Date, default: Date.now},
// });

// const gameMap = mongoose.model('GameMap', gameMapSchema);

// module.exports = gameMap;