const express = require("express");
const { route } = require("./authRoutes");
const {
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addOrder,
} = require("../Controllers/orderController");
const router = express.Router();

router.get("/get-order/:id", getOrder);
router.get("/get-all-orders", getAllOrders);
router.post("/create-order", addOrder);
router.patch("/update-order/:id", updateOrder);
router.delete("/delete-order/:id", deleteOrder);

module.exports = router;
