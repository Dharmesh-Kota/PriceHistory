const { response } = require("express");
const { Pool } = require("pg");

const connectOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
const pool = new Pool(connectOptions);

const getUsers = (req, res) => {
  pool
    .query(`select * from pricehistory.users order by user_id asc`)
    .then((results) => {
      console.log("users get successfully");
      res.render("users", { data: results });
    })
    .catch((e) => console.log(e));
};

const getUserById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool
    .query(`SELECT * FROM pricehistory.users WHERE user_id = $1`, [id])
    .then((results) => res.json(results.rows))
    .catch((err) => res.json(err));
};

const createUser = (req, res) => {
  const { user_id, user_email, user_password, postal_code } = req.body;
  pool
    .query("INSERT into pricehistory.users VALUES($1, $2, $3, $4)", [
      user_id,
      user_email,
      user_password,
      postal_code,
    ])
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { user_password, postal_code } = req.body;
  console.log(user_password, postal_code);
  pool
    .query(
      "UPDATE pricehistory.users SET user_password = $1, postal_code = $2 where user_id = $3",
      [user_password, postal_code, id]
    )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM pricehistory.users where user_id = $1", [id])
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const getProducts = (req, res) => {
  pool
    .query(`select * from pricehistory.product`)
    .then((results) => {
      res.render("products", { data: results });
    })
    .catch((e) => console.log(e));
};

const getProuctById = (req, res) => {
  const id = req.params.id;
  pool
    .query("select * from pricehistory.product where product_id = $1", id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const createProduct = (req, res) => {
  const { product_id, product_name, brand, weight, length, width, height } =
    req.body;
  pool
    .query(
      "insert into pricehistory.product values(proudct_id = $1, product_name = $2, brand = $3, weight = $4, length = $5, width = $6, height = $7)",
      [product_id, product_name, brand, width, length, width, height]
    )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getProducts,
  getProuctById,
  deleteUser,
  createProduct,
};
