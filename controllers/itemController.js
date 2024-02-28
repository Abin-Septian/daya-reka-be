const Item = require('../models/itemModel');

class ItemController {
  static getAllItems(req, res) {
    Item.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ data: results });
    });
  }

  static getItemById(req, res) {
    const itemId = req.params.id;
    Item.getById(itemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (!result) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.json({ data: result });
    });
  }

  static createItem(req, res) {
    const itemData = req.body;
    Item.create(itemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Item created successfully', data: result });
    });
  }

  static updateItem(req, res) {
    const itemId = req.params.id;
    const itemData = req.body;
    Item.update(itemId, itemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Item updated successfully' });
    });
  }

  static deleteItem(req, res) {
    const itemId = req.params.id;
    Item.delete(itemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Item deleted successfully' });
    });
  }
}

module.exports = ItemController;
