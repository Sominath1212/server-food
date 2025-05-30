const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./Routers/authRoutes");
const foodRoutes = require("./Routers/foodRoutes");
const orderRoutes = require("./Routers/orderRoutes");
const connection = require("./Db/Connection");
const categoriesRoute = require("./Routers/categoriesRoute");
dotenv.config();
const app = express();
/// middleware function call
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/category",categoriesRoute)
app.listen(PORT, () => {
  connection.connect((err) => {
    if (err) {
      console.log("unable to connect with the mysql❌");
    } else {
      const usertblquery =
        "CREATE TABLE if not exists `users` (`id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `email` VARCHAR(50) NOT NULL , `password` VARCHAR(255) NOT NULL , `image` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";
      console.log("successfully connect with mysql✅");
    }
  });
  console.log("server is started on ", `http://localhost:${PORT}/`);
});
