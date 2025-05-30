const { trace } = require("joi");
const connection = require("../Db/Connection");
const e = require("express");
const getAllFood = (req, res) => {
  try {
    const query = "select * from foods;";
    connection.query(query, (err, result) => {
      // console.log(result);
      return res.status(200).json((foods = result));
    });
  } catch (error) {
    return res.status(500).json({ message: "unable to fetch data " });
  }
};
const addFood = (req, res) => {
  const { name, image, price, description, category } = req.body;
  try {
    const q = `select * from foods where name="${name}" and category="${category}";`;
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length != 0) {
          return res
            .status(200)
            .json({ message: "this is food is already taken" });
        } else {
          const qu = `insert into foods (name, image_url, price, description, category )values("${name}","${image}",${price},"${description}","${category}")`;

          connection.query(qu, (err, result) => {
            if (err) {
              throw err;
            } else {
              return res
                .status(200)
                .json({ message: "food added succefully", foods: result });
            }
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "unable to fetch data" });
  }
};
const getFood = (req, res) => {
  const { id } = req.params;
  try {
    const q = `select * from foods where id=${id};`;
    connection.query(q, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "unable to fetch food" });
      } else {
        if (result.length == 0) {
          return res
            .status(500)
            .json({ message: "no food present in the list" });
        } else {
          return res.status(200).json({ food: result[0] });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "unable to fetch data" });
    throw error;
  }
};
const updateFood = (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (!id) {
    res.status(500).json({ message: "provide id" });
  }
  let { name, image, price, description, category } = req.body;
  const query = `select * from foods where id=${id};`;

  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length != 0) {
      if (name === undefined) name = result[0].name;
      if (price === undefined) price = result[0].price;

      if (category === "") category = result[0].category;
      if (description === "") description = result[0].description;
      if (image === undefined) image = result[0].image_url;
      // console.log(name, image_url, price, description, category);
      const updateq = `update foods set name = "${name}",image_url = "${image}",price = ${price},description = "${description}",category = "${category}" WHERE id = ${id};`;

      connection.query(updateq, (err, result) => {
        if (err) {
          throw err;
        } else {
          return res.status(200).json({
            message: "food updated successfully",
            result,
          });
        }
      });
    } else {
      return res.status(500).json({ message: "food not found" });
    }
  });
};
const deleteFood = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(`select * from foods where id=${id}`, (err, result1) => {
      if (err) {
        return res.status(500).json({ message: "unable to delete food" });
      }
      if (result1.length == 0) {
        return res.status(500).json({ message: "food not found" });
      } else {
        connection.query(`delete from foods where id=${id}`, (err, result) => {
          if (err) {
            throw err;
          }
          if (result.length != 0) {
            res
              .status(200)
              .json({ message: "food deleted successfully", food: result1 });
          }
        });
      }
    });
  } catch (error) {}
};

module.exports = {
  getAllFood,
  getFood,
  addFood,
  deleteFood,
  updateFood,
};
