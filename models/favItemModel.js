const db = require("../config/db");

class FavItem {
  static getAll(callback) {
    db.query(
      "SELECT f.*, i.name AS item_name FROM fav_item f JOIN items i ON f.item_id = i.id",
      callback
    );
  }

  static getById(id, callback) {
    db.query(
      "SELECT f.*, i.name AS item_name FROM fav_item f JOIN items i ON f.item_id = i.id WHERE f.id = ?",
      id,
      callback
    );
  }

  static getByCustomerId(id, callback) {
    db.query(
      "SELECT f.*, i.name AS item_name FROM fav_item f JOIN items i ON f.item_id = i.id WHERE f.customer_id = ?",
      id,
      callback
    );
  }

  static create(favItemData, callback) {
    db.query("INSERT INTO fav_item SET ?", favItemData, callback);
  }

  static update(id, favItemData, callback) {
    db.query("UPDATE fav_item SET ? WHERE id = ?", [favItemData, id], callback);
  }

  static delete(id, callback) {
    db.query("DELETE FROM fav_item WHERE id = ?", id, callback);
  }

  static getTopFive(callback) {
    const query = `
    SELECT i.*, COUNT(fi.item_id) AS fav_count
    FROM items i
    LEFT JOIN fav_item fi ON i.id = fi.item_id
    GROUP BY i.id
    ORDER BY fav_count DESC
    LIMIT 5;
`;

    db.query(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = FavItem;
