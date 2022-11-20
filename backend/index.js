const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const { Pool } = require("pg");

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static("../frontend/public"));

require("dotenv").config();

const indexRoutes = require("./Routes/index");

app.use(express.json());
app.use(indexRoutes);

app.listen(port, () => console.log("Server Listening on PORT ", port));
