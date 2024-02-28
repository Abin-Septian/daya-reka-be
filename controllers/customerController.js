const Customer = require('../models/customerModel');

class CustomerController {
  static getAllCustomers(req, res) {
    Customer.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ data: results });
    });
  }

  static getCustomerById(req, res) {
    const customerId = req.params.id;
    Customer.getById(customerId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (!result) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      res.json({ data: result });
    });
  }

  static createCustomer(req, res) {
    const customerData = req.body;
    Customer.create(customerData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Customer created successfully', data: result });
    });
  }

  static updateCustomer(req, res) {
    const customerId = req.params.id;
    const customerData = req.body;
    Customer.update(customerId, customerData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Customer updated successfully' });
    });
  }

  static deleteCustomer(req, res) {
    const customerId = req.params.id;
    Customer.delete(customerId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Customer deleted successfully' });
    });
  }
}

module.exports = CustomerController;
