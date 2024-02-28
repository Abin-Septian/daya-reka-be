const express = require('express');
const router = express.Router();
const CustomerLevelController = require('../controllers/customerLevelController');

// GET all customer levels
router.get('/', CustomerLevelController.getAllLevels);

// GET customer level by ID
router.get('/:id', CustomerLevelController.getLevelById);

// POST create a new customer level
router.post('/', CustomerLevelController.createLevel);

// PUT update an existing customer level
router.put('/:id', CustomerLevelController.updateLevel);

// DELETE delete a customer level
router.delete('/:id', CustomerLevelController.deleteLevel);

module.exports = router;
