const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");
const customerLevelRoutes = require("./routes/customerLevelRoutes");
const itemRoutes = require("./routes/itemRoutes");
const favItemRoutes = require("./routes/favItemRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const invoiceDetailRoutes = require("./routes/invoiceDetailRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const topFiveRoutes = require("./routes/topFiveRoutes");
const app = express();

app.use(bodyParser.json());

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/customer-levels", customerLevelRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/fav-items", favItemRoutes);
app.use("/api/v1/top5", topFiveRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/invoice-detail", invoiceDetailRoutes);
app.use("/api/v1/transaction", transactionRoutes);

function listRoutes(app) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
      });
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        const path = middleware.regexp.toString().split("\\")[3];
        routes.push({
          path: "/api/v1" + path + handler.route.path,
          method: Object.keys(handler.route.methods)[0].toUpperCase(),
        });
      });
    }
  });
  return routes;
}

console.log(listRoutes(app));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
