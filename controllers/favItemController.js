const FavItem = require("../models/favItemModel");
const Item = require("../models/itemModel");

class FavItemController {
  static getAllFavItems(req, res) {
    FavItem.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ data: results });
    });
  }

  static getFavItemById(req, res) {
    const favItemId = req.params.id;
    FavItem.getById(favItemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (!result) {
        res.status(404).json({ error: "Favorite item not found" });
        return;
      }
      res.json({ data: result });
    });
  }

  static createFavItem(req, res) {
    const favItemData = req.body;
    FavItem.create(favItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res
        .status(201)
        .json({ message: "Favorite item created successfully", data: result });
    });
  }

  static updateFavItem(req, res) {
    const favItemId = req.params.id;
    const favItemData = req.body;
    FavItem.update(favItemId, favItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Favorite item updated successfully" });
    });
  }

  static deleteFavItem(req, res) {
    const favItemId = req.params.id;
    FavItem.delete(favItemId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Favorite item deleted successfully" });
    });
  }

  static getTopFavItems(req, res) {
    FavItem.getTopFive((err, topFavItems) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(topFavItems);
    });
  }
}

module.exports = FavItemController;
