const express = require("express");

const {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoriescontroller");
const router = express.Router();
router.get("/get-categories", getCategory);
router.post("/add-category", addCategory);
router.patch("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);
module.exports = router;
