const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

// GET all customers
router.get('/', CustomerController.getAllCustomers);

// GET customer by ID
router.get('/:id', CustomerController.getCustomerById);

// POST create a new customer
router.post('/', CustomerController.createCustomer);

// PUT update an existing customer
router.put('/:id', CustomerController.updateCustomer);

// DELETE delete a customer
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;
