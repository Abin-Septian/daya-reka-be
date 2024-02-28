const db = require('../config/db');

class Customer {
  static getAll(callback) {
    db.query('SELECT * FROM customer', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM customer WHERE id = ?', id, callback);
  }

  static create(newCustomer, callback) {
    db.query('INSERT INTO customer SET ?', newCustomer, callback);
  }

  static update(id, updatedCustomer, callback) {
    db.query('UPDATE customer SET ? WHERE id = ?', [updatedCustomer, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM customer WHERE id = ?', id, callback);
  }
}

module.exports = Customer;
