const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const { Client } = require("pg");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static("../frontend/public"));

require("dotenv").config();

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "121210",
    database: "202001154",
  });
  client
    .connect()
    .then(() => console.log("DB connected successfully"))
    .then(() => client.query(`select * from pricehistory.users`))
    .then((results) => {
      res.render("users", { data: results });
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
});

app.get("/products", (req, res) => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "121210",
    database: "202001154",
  });
  client
    .connect()
    .then(() => console.log("DB connected successfully"))
    .then(() => client.query(`select * from pricehistory.product`))
    .then((results) => {
      res.render("products", { data: results });
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
});

app.get("/queries", (req, res) => {
  res.render("queries");
});

app.listen(port, () => console.log("Server Listening on PORT ", port));
