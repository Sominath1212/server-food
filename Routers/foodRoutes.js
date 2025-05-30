const express = require("express");
const {
  getAllFood,
  addFood,
  updateFood,
  deleteFood,
  getFood,
} = require("../Controllers/foodController");

const router = express.Router();
router.get("/get-all-foods", getAllFood);
router.post("/add-food", addFood);
router.get("/get-food/:id", getFood);
router.patch("/update-food/:id", updateFood);
router.delete("/delete-food/:id", deleteFood);
module.exports = router;
