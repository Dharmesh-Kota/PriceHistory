const express = require("express");
const router = express.Router();

const {
  getHome,
  getUsers,
  getProuctById,
  getProducts,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createProduct,
  deleteProduct,
  updateProduct,
  getQuery,
  runQuery,
  schema,
  schemaVisualizer
} = require("../Controllers/index");

router.get("/", getHome);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/products", getProducts);
router.get("/products/:id", getProuctById);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/queries", getQuery);
router.post("/queries", runQuery);
router.get("/schema", schema);
router.get("/schema-visualizer", schemaVisualizer);

module.exports = router;
