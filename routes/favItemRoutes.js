const express = require('express');
const router = express.Router();
const FavItemController = require('../controllers/favItemController');

// GET all favorite items
router.get('/', FavItemController.getAllFavItems);

// GET favorite item by ID
router.get('/:id', FavItemController.getFavItemById);

// POST create a new favorite item
router.post('/', FavItemController.createFavItem);

// PUT update an existing favorite item
router.put('/:id', FavItemController.updateFavItem);

// DELETE delete a favorite item
router.delete('/:id', FavItemController.deleteFavItem);

module.exports = router;
