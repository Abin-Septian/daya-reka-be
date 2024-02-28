const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");

router.post("/transactions", TransactionController.createTransaction);

module.exports = router;
