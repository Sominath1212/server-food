const { json } = require("express");
const connection = require("../Db/Connection");

const addCategory = (req, res) => {
  const { title, image } = req.body;
  const q = `select * from categories where title ="${title}";`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        // add category

        const query = `insert into categories(title,image)values("${title}","${image}")`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            throw err;
          }
          if (result.length != 0) {
            res.status(200).json("category added");
          }
        });
      } else {
        return res.status(500).json({ message: "category already taken" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteCategory = (req, res) => {
  const { id } = req.params;
  const query = `select * from categories where id=${id};`;

  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        return res.status(200).json({ message: "category not found" });
      } else {
        connection.query(
          `delete from categories where id=${id}`,
          (err, result) => {
            if (err) {
              throw err;
            }
            return res.status(200).json({ message: "category deleted" });
          }
        );
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong " });
  }
};
const updateCategory = (req, res) => {
  const { id } = req.params;
  let { title, image } = req.body;
  const query = `select * from categories where id=${id};`;
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        return res.status(500).json({ message: "no such category found" });
      } else {
        if (title === undefined) title = result[0].title;
        if (image === undefined) image = result[0].image;

        const updateQ = `update categories set title="${title}", image="${image}" where id=${id};`;

        connection.query(updateQ, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({
              message: "category updated",
              updatedCategory: { title, image },
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
const getCategory = (req, res) => {
  const query = "select * from categories;";

  connection.query(query, (err, result) => {
    if (err) res.status(500).json({ message: "unable to fetch categories" });
    if (result.length != 0) {
      return res
        .status(200)
        .json({ message: "data fetch", categories: result });
    }
  });
};

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategory,
};

// // const { title, image } = req.body;
//   const query = `insert into categories (title,image)values("${title}","${image}");`;
//   try {
//     connection.query(query, (err, res) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: "unable to add a category" });
//       } else {
//         return (
//           res.status(200), json({ message: "categiry added successfully" })
//         );
//       }
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "something went wrong" });
// //   }
