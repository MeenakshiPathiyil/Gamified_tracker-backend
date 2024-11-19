const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    default: 20
  },
  points: {
    type: Number,
    default: 0
  },
  purchasedItems: [
    {
        name: String,
        imagePath: String,
        cost: Number,
        purchasedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;