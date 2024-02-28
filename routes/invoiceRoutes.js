const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoiceController');

// GET all invoices
router.get('/', InvoiceController.getAllInvoices);

// GET invoice by ID
router.get('/:id', InvoiceController.getInvoiceById);

// POST create a new invoice
router.post('/', InvoiceController.createInvoice);

// PUT update an existing invoice
router.put('/:id', InvoiceController.updateInvoice);

// DELETE delete an invoice
router.delete('/:id', InvoiceController.deleteInvoice);

module.exports = router;
