const Invoice = require("../models/invoiceModel");
const TransactionItem = require("../models/transactionItemModel");
const Item = require("../models/itemModel");

class TransactionController {
  static createTransaction(req, res) {
    const { customerId, items } = req.body;

    const invoiceData = {
      customer_id: customerId,
      items: JSON.stringify(items),
      total: items.reduce((total, item) => total + item.price, 0),
    };

    Invoice.create(invoiceData, (err, invoiceResult) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const transactionItemsData = items.map((item) => ({
        invoice_id: invoiceResult.insertId,
        item_id: item.id,
        quantity: item.quantity,
      }));

      TransactionItem.create(
        transactionItemsData,
        async (err, transactionItemsResult) => {
          if (err) {
            Invoice.delete(invoiceResult.insertId, (delErr, _) => {
              if (delErr) {
                console.error("Failed to rollback invoice creation:", delErr);
              }
            });
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          const itemIds = items.map((item) => item.id);
          Item.getAll((err, allItems) => {
            if (err) {
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }
            const itemDetails = allItems.filter((item) =>
              itemIds.includes(item.id)
            );
            const response = {
              message: "Transaction created successfully",
              invoice: invoiceResult.insertId,
              transactionItems: transactionItemsResult.insertId,
              itemDetails: itemDetails,
            };
            res.status(201).json(response);
          });
        }
      );
    });
  }
}

module.exports = TransactionController;
