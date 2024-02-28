const db = require('../config/db');

class TransactionItem {
  static getAll(callback) {
    db.query('SELECT * FROM transaction_item', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM transaction_item WHERE id = ?', id, callback);
  }

  static async getByInvoiceId(invoiceId, callback) {
    db.query('SELECT * FROM transaction_item WHERE invoice_id = ?', invoiceId, callback);
  }

  static create(transactionItemData, callback) {
    db.query('INSERT INTO transaction_item SET ?', transactionItemData, callback);
  }

  static update(id, transactionItemData, callback) {
    db.query('UPDATE transaction_item SET ? WHERE id = ?', [transactionItemData, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM transaction_item WHERE id = ?', id, callback);
  }
}

module.exports = TransactionItem;
