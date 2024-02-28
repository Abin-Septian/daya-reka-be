const TransactionItem = require('../models/transactionItemModel');

class TransactionItemController {
  static getAllTransactionItems(req, res) {
    TransactionItem.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ data: results });
    });
  }

  static getTransactionItemById(req, res) {
    const transactionItemId = req.params.id;
    TransactionItem.getById(transactionItemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (!result) {
        res.status(404).json({ error: 'Transaction item not found' });
        return;
      }
      res.json({ data: result });
    });
  }

  static async getTransactionItemsByInvoiceId(invoiceId) {
    try {
      return await TransactionItem.getByInvoiceId(invoiceId);
    } catch (error) {
      throw error;
    }
  }

  static createTransactionItem(req, res) {
    const transactionItemData = req.body;
    TransactionItem.create(transactionItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({ message: 'Transaction item created successfully', data: result });
    });
  }

  static updateTransactionItem(req, res) {
    const transactionItemId = req.params.id;
    const transactionItemData = req.body;
    TransactionItem.update(transactionItemId, transactionItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Transaction item updated successfully' });
    });
  }

  static deleteTransactionItem(req, res) {
    const transactionItemId = req.params.id;
    TransactionItem.delete(transactionItemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Transaction item deleted successfully' });
    });
  }
}

module.exports = TransactionItemController;
