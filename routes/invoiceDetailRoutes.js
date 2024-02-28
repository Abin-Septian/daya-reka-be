const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoiceController');


// Route for getting all invoice details
router.get('/', InvoiceController.getAllInvoiceDetails);

// Invoice detail
router.get('/:id', InvoiceController.getInvoiceDetails);

module.exports = router;
