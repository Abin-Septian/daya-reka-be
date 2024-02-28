const express = require('express');
const router = express.Router();
const FavItemController = require('../controllers/favItemController');

router.get('/', FavItemController.getTopFavItems);

module.exports = router;
