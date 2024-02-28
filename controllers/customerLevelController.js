const CustomerLevel = require('../models/customerLevelModel');

class CustomerLevelController {
  static getAllLevels(req, res) {
    CustomerLevel.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ data: results });
    });
  }

  static getLevelById(req, res) {
    const levelId = req.params.id;
    CustomerLevel.getById(levelId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (!result) {
        res.status(404).json({ error: 'Customer level not found' });
        return;
      }
      res.json({ data: result });
    });
  }

  static createLevel(req, res) {
    const levelData = req.body;
    CustomerLevel.create(levelData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Customer level created successfully', data: result });
    });
  }

  static updateLevel(req, res) {
    const levelId = req.params.id;
    const levelData = req.body;
    CustomerLevel.update(levelId, levelData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Customer level updated successfully' });
    });
  }

  static deleteLevel(req, res) {
    const levelId = req.params.id;
    CustomerLevel.delete(levelId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Customer level deleted successfully' });
    });
  }
}

module.exports = CustomerLevelController;
