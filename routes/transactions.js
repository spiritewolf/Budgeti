const express = require('express');
const router = express.Router();
const {getTransactions, addTransaction, deleteTransaction} = require('../controllers/transactions/transactions')
const auth = require('../middleware/jwtauth');

router.route('/').get(auth, getTransactions).post(auth, addTransaction);
router.route('/:id').delete(auth, deleteTransaction);

module.exports = router;
