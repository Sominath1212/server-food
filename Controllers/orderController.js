const connection = require("../Db/Connection");

const addOrder = (req, res) => {
  const { name, date, address, items, price, status, payment_method } =
    req.body;

  try {
    const q = `insert into orders(name, dinak, address, items, price, status, payment_method)values("${name}", ${date}, "${address}", "${items}", ${price}, "${status}", "${payment_method}");`;
    connection.query(q, (err, results) => {
      if (err) {
        // throw err;
        console.log(err);

        return res.status(500).json({ message: "unable to add order" });
      } else {
        return res.status(200).json({
          message: "order placed succefully",
          data: results,
        });
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "something went wrong" });
  }
};
const getAllOrders = (req, res) => {
  const query = "select * from orders;";
  try {
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "unable to fetch" });
      } else {
        res.status(200).json({ data: result });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
const getOrder = (req, res) => {
  const { id } = req.params;

  const query = `select * from orders where id=${id};`;
  try {
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "unable to fetch" });
      } else {
        res.status(200).json({ data: result });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
const updateOrder = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(500).json({ message: "provide id" });
  }
  console.log(req.body);

  let { status } = req.body;
  const query = `select * from orders where id=${id};`;

  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);

    if (result.length != 0) {
      if (status === undefined) status = result[0].status;

      const updateq = `update orders set status = "${status}" WHERE id = ${id};`;

      connection.query(updateq, (err, result) => {
        console.log(updateq);

        if (err) {
          throw err;
        } else {
          return res.status(200).json({
            message: "order updated successfully",
            newfood: {
              status,
            },
          });
        }
      });
    } else {
      return res.status(500).json({ message: "order not found" });
    }
  });
};
const deleteOrder = (req, res) => {
  const { id } = req.params;

  const query = `select * from orders where id=${id};`;
  try {
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "unable to delete order" });
      }
      if (result.length != 0) {
        const dq = `delete from orders where id=${id};`;
        connection.query(dq, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(200).json({ message: "order deleted successfully" });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addOrder,
};
