const db = require('../config/db');

class Item {
  static getAll(callback) {
    db.query('SELECT * FROM items', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM items WHERE id = ?', id, callback);
  }

  static create(itemData, callback) {
    db.query('INSERT INTO items SET ?', itemData, callback);
  }

  static update(id, itemData, callback) {
    db.query('UPDATE items SET ? WHERE id = ?', [itemData, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM items WHERE id = ?', id, callback);
  }
}

module.exports = Item;
