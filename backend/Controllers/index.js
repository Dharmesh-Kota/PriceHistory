const { Pool } = require("pg");

const connectOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = new Pool(connectOptions);

const getHome = (req, res) => {
  pool
    .query(
      "Select product_id, avg(rating) From rating group by product_id order by product_id ASC"
    )
    .then((response) => {
      pool
        .query(
          "SELECT product_id, product_name FROM product where product_id = (select product_id from buys group by product_id order by count(product_id) DESC limit 1);"
        )
        .then((response2) => {
          pool
            .query(
              "select product_id, min(price) as min_price, max(price) as max_price from price_history group by product_id order by product_id ASC;"
            )
            .then((response3) => {
              res.render("index", {
                data: {
                  res1: response.rows,
                  res2: response2.rows,
                  res3: response3.rows,
                },
              });
            });
        });
    })
    .catch((err) => res.json(err));
};

const getUsers = (req, res) => {
  pool
    .query(`select * from users order by user_id asc`)
    .then((results) => {
      console.log("users get successfully");
      res.render("users", { data: results });
    })
    .catch((e) => res.json(e));
};

const getUserById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool
    .query(`SELECT * FROM users WHERE user_id = $1`, [id])
    .then((results) => {
      console.log("user get successfully");
      res.json(results.rows);
    })
    .catch((err) => res.json(err));
};

const createUser = (req, res) => {
  const { user_id, user_email, user_password, postal_code } = req.body;
  pool
    .query("INSERT into users VALUES($1, $2, $3, $4)", [
      user_id,
      user_email,
      user_password,
      postal_code,
    ])
    .then((response) => {
      console.log("new user created successfully");
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { user_password, postal_code } = req.body;
  console.log(user_password, postal_code, id);
  pool
    .query(
      "UPDATE users SET user_password = $1, postal_code = $2 where user_id = $3",
      [user_password, postal_code, id]
    )
    .then((response) => {
      console.log("user updated successfully");
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM users where user_id = $1", [id])
    .then((response) => {
      console.log("user deleted successfully");
      res.redirect("/users");
    })
    .catch((err) => res.json(err));
};

const getProducts = (req, res) => {
  pool
    .query(`select * from product order by product_id asc`)
    .then((results) => {
      console.log("products get successfully");
      res.render("products", { data: results });
    })
    .catch((e) => res.json(e));
};

const getProuctById = (req, res) => {
  const id = req.params.id;
  pool
    .query("select * from product where product_id = $1", id)
    .then((response) => {
      console.log("product get successfully");
      res.json(response);
    })
    .catch((err) => res.json(err));
};

const createProduct = (req, res) => {
  const { product_id, product_name, brand, weight, length, width, height } =
    req.body;
  pool
    .query(
      "insert into product values($1, $2, $3, $4, $5,  $6, $7)",
      [product_id, product_name, weight, brand, width, length, height]
    )
    .then((response) => {
      console.log("product created successfully");
      res.redirect("/products");
    })
    .catch((err) => res.json(err));
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM product WHERE product_id = $1", [id])
    .then((response) => {
      console.log("product deleted successfully");
      res.redirect("/products");
    })
    .catch((err) => res.json(err));
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const { product_name, weight, brand, width, length, height } = req.body;
  pool
    .query(
      `UPDATE product SET product_name = $1, 
                                              weight = $2,
                                              brand = $3,
                                              width = $4,
                                              length = $5,
                                              height = $6
                                              
                                              where product_id = $7`,
      [product_name, weight, brand, width, length, height, id]
    )
    .then((response) => {
      console.log("product updated successfully");
      res.redirect("/products");
    })
    .catch((err) => res.json(err));
};

const getQuery = (req, res) => {
  res.render("queries", { data: {} });
};

const runQuery = (req, res) => {
  // console.log(req.body);
  pool
    .query(`${req.body.query}`)
    .then((response) =>
      res.render("queries", { data: { resp: response, query: req.body.query } })
    )
    .catch((err) => res.json(err));
};

module.exports = {
  getHome,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getProducts,
  getProuctById,
  deleteUser,
  createProduct,
  deleteProduct,
  updateProduct,
  getQuery,
  runQuery,
};
