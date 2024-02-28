const Invoice = require("../models/invoiceModel");
const Transaction = require("../models/transactionItemModel");
const Item = require("../models/itemModel");
const Customer = require("../models/customerModel");
const CustomerLevel = require("../models/customerLevelModel");
const FavItem = require("../models/favItemModel");

class InvoiceController {
  static getAllInvoices(req, res) {
    Invoice.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ data: results });
    });
  }

  static getInvoiceById(req, res) {
    const invoiceId = req.params.id;
    Invoice.getById(invoiceId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (!result) {
        res.status(404).json({ error: "Invoice not found" });
        return;
      }
      res.json({ data: result });
    });
  }

  static createInvoice(req, res) {
    const invoiceData = req.body;
    Invoice.create(invoiceData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res
        .status(201)
        .json({ message: "Invoice created successfully", data: result });
    });
  }

  static updateInvoice(req, res) {
    const invoiceId = req.params.id;
    const invoiceData = req.body;
    Invoice.update(invoiceId, invoiceData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Invoice updated successfully" });
    });
  }

  static deleteInvoice(req, res) {
    const invoiceId = req.params.id;
    Invoice.delete(invoiceId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Invoice deleted successfully" });
    });
  }

  static async fetchInvoiceDetails(invoiceId) {
    try {
      const invoices = await new Promise((resolve, reject) => {
        Invoice.getById(invoiceId, (err, results) => {
          if (err) {
            reject(new Error("Error fetching invoices"));
            return;
          }
          resolve(results);
        });
      });

      const invoicesWithDetails = await Promise.all(
        invoices.map(async (invoice) => {
          const invoiceId = invoice.id;
          const customerId = invoice.customer_id;
          const transactionItems = await new Promise((resolve, reject) => {
            Transaction.getByInvoiceId(invoiceId, (err, results) => {
              if (err) {
                reject(new Error("Error fetching transaction items"));
                return;
              }
              resolve(results);
            });
          });

          const customer = await new Promise((resolve, reject) => {
            Customer.getById(customerId, (err, results) => {
              if (err) {
                reject(new Error("Error fetching transaction items"));
                return;
              }
              resolve(results.pop());
            });
          });

          const level = await new Promise((resolve, reject) => {
            CustomerLevel.getById(customer.level_id, (err, results) => {
              if (err) {
                reject(new Error("Error fetching transaction items"));
                return;
              }
              resolve(results.pop().level);
            });
          });
          
          
          const favourite = await new Promise((resolve, reject) => {
            FavItem.getByCustomerId(customerId, (err, results) => {
              if (err) {
                reject(new Error("Error fetching transaction items"));
                return;
              }
              resolve(results.pop().item_name);
            });
          });

          const items = await Promise.all(
            transactionItems.map(async (transactionItem) => {
              const itemId = transactionItem.item_id;
              const itemDetails = await new Promise((resolve, reject) => {
                Item.getById(itemId, (err, result) => {
                  if (err) {
                    reject(err);
                    return;
                  }
                  resolve(result);
                });
              });

              const itemTotal = transactionItem.quantity * itemDetails[0].price;

              return {
                quantity: transactionItem.quantity,
                ...itemDetails[0],
                total: itemTotal,
              };
            })
          );

          const invoiceTotal = items.reduce(
            (total, item) => total + item.total,
            0
          );

          const newCustomer = customer;
          newCustomer.level = level;
          newCustomer.fav_item = favourite;

          return {
            id: invoiceId,
            customer: newCustomer,
            items,
            total: invoiceTotal,
          };
        })
      );

      return invoicesWithDetails;
    } catch (error) {
      throw error;
    }
  }

  static async getAllInvoiceDetails(req, res) {
    try {
      const invoices = await new Promise((resolve, reject) => {
        Invoice.getAll((err, results) => {
          if (err) {
            reject(new Error("Error fetching invoices"));
            return;
          }
          resolve(results);
        });
      });

      const invoicesWithDetails = await Promise.all(
        invoices.map(async (invoice) => {
          try {
            const details = await InvoiceController.fetchInvoiceDetails(
              invoice.id
            );
            return { ...details.pop() };
          } catch (error) {
            console.error(
              `Error fetching details for invoice ${invoice.id}:`,
              error
            );
            return { ...invoice, details: [], error: "Error fetching details" };
          }
        })
      );

      res.json({ data: invoicesWithDetails });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getInvoiceDetails(req, res) {
    const invoiceId = req.params.id;

    try {
      const details = await InvoiceController.fetchInvoiceDetails(invoiceId);
      res.json({ data: details.pop() });
    } catch (error) {
      console.error(`Error fetching details for invoice ${invoiceId}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = InvoiceController;
