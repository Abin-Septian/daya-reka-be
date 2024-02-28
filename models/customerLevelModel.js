const db = require('../config/db');

class CustomerLevel {
  static getAll(callback) {
    db.query('SELECT * FROM customer_level', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM customer_level WHERE id = ?', id, callback);
  }

  static create(levelData, callback) {
    db.query('INSERT INTO customer_level SET ?', levelData, callback);
  }

  static update(id, levelData, callback) {
    db.query('UPDATE customer_level SET ? WHERE id = ?', [levelData, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM customer_level WHERE id = ?', id, callback);
  }
}

module.exports = CustomerLevel;
