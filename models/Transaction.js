const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
  date: {
    type: String,
    required: true
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Please add text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
