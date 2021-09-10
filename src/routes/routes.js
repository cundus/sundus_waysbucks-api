const { Router } = require("express");
const route = Router();

const { uploadFile } = require("../middleware/uploadFiles");
const { register, login } = require("../controller/auth");
const { addRole } = require("../controller/role");
const {
  getUsers,
  getUser,
  getLoggedinUser,
  updateUser,
} = require("../controller/user");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controller/product");
const { auth, admin } = require("../middleware/auth");
const {
  deleteTopping,
  getToppings,
  getTopping,
  addTopping,
  updateTopping,
} = require("../controller/topping");
const {
  addTransaction,
  getTransactions,
  getTransactionsByUserId,
  updateTransaction,
} = require("../controller/transaction");

//auth & User
route.post("/register", register);
route.post("/login", login);
route.get("/users", auth, admin, getUsers);
route.get("/user/:id", auth, admin, getUser);
route.get("/profile", auth, getLoggedinUser);
route.patch("/profile", auth, uploadFile("picture"), updateUser);
route.delete("/user/:id", auth, admin);

// Products
route.get("/products", getProducts);
route.get("/product/:id", getProduct);
route.post("/add-product", auth, admin, uploadFile("image"), addProduct);
route.patch("/product/:id", auth, admin, uploadFile("image"), updateProduct);
route.delete("/product/:id", auth, admin, deleteProduct);

// Topping
route.get("/toppings", getToppings);
route.get("/topping/:id", getTopping);
route.post("/add-topping", auth, admin, uploadFile("image"), addTopping);
route.patch("/topping/:id", auth, admin, uploadFile("image"), updateTopping);
route.delete("/topping/:id", auth, admin, deleteTopping);

//Transaction
route.post("/add-transaction", auth, uploadFile("attachment"), addTransaction);
route.get("/transactions", getTransactions);
route.get("/profile/transactions", auth, getTransactionsByUserId);
route.patch("/transaction/:id", auth, updateTransaction);

//Role
route.post("/add-role", addRole);

module.exports = route;
