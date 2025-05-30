const bcrypt = require("bcrypt");
const connection = require("../Db/Connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const q = `select * from users where email="${email}";`;
    connection.query(q, async (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.status(500).json({ message: "user not found" });
      } else {
        const hashpassword = result[0].password;
        const isMatch = await bcrypt.compare(password, hashpassword);
        // console.log(isMatch);
        const user = result[0];
        if (isMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              password: user.password,
            },
            jwt_secret,
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(200)
            .json({ message: "login is here", user: user, token: token });
        }
      }
    });
    // res.status(200).json({ message: "login is here" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    // console.log(name, email, password, image);

    const q = `select * from users where email="${email}";`;
    const salt = 10;
    const newpass = await bcrypt.hash(password, salt);
    connection.query(q, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        const insertq = `insert into users(name,email,password,image)values("${name}","${email}","${newpass}","${image}");`;
        connection.query(insertq, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "unable to register" });
          } else {
            return res
              .status(200)
              .json({ message: "register successfully!!", user: result });
          }
        });
      } else {
        console.log("user is already present!!");
        return res.status(500).json({ message: "user is already present!!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "something went happened" });
    console.log("error", error);
  }
};

module.exports = {
  login,
  register,
};
