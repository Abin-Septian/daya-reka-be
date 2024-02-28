const express = require('express');
const router = express.Router();
const TransactionItemController = require('../controllers/transactionItemController');

// GET all transaction items
router.get('/', TransactionItemController.getAllTransactionItems);

// GET transaction item by ID
router.get('/:id', TransactionItemController.getTransactionItemById);

// POST create a new transaction item
router.post('/', TransactionItemController.createTransactionItem);

// PUT update an existing transaction item
router.put('/:id', TransactionItemController.updateTransactionItem);

// DELETE delete a transaction item
router.delete('/:id', TransactionItemController.deleteTransactionItem);

module.exports = router;
