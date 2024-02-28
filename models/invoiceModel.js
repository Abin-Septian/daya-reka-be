const db = require('../config/db');

class Invoice {
  static getAll(callback) {
    db.query('SELECT * FROM invoice', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM invoice WHERE id = ?', id, callback);
  }

  static create(invoiceData, callback) {
    db.query('INSERT INTO invoice SET ?', invoiceData, callback);
  }

  static update(id, invoiceData, callback) {
    db.query('UPDATE invoice SET ? WHERE id = ?', [invoiceData, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM invoice WHERE id = ?', id, callback);
  }
}

module.exports = Invoice;
