const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/itemController');

// GET all items
router.get('/', ItemController.getAllItems);

// GET item by ID
router.get('/:id', ItemController.getItemById);

// POST create a new item
router.post('/', ItemController.createItem);

// PUT update an existing item
router.put('/:id', ItemController.updateItem);

// DELETE delete an item
router.delete('/:id', ItemController.deleteItem);

module.exports = router;
