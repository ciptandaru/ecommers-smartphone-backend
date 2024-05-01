const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const ProductController = require("../controllers/productController");
const {
  authentication,
  authorizationAdmin,
  authorization,
} = require("../middleware/authentication");
const errorHandling = require("../middleware/errorHandler");
const CustomerController = require("../controllers/customerController");

// login & register customers
router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.get("/product", ProductController.readProduct);
router.get("/product/:id", ProductController.readProductDetail);

// login & register admin
router.post("/admin/login", AdminController.loginAdmin);
router.post("/admin/register", authentication, AdminController.registerAdmin);

// CRUD admin
router.post(
  "/admin/product",
  authentication,
  authorizationAdmin,
  ProductController.createProduct
);
router.get("/admin/product", authentication, ProductController.readProduct);
router.get(
  "/admin/product/:id",
  authentication,
  ProductController.readProductDetail
);
router.patch(
  "/admin/product/:id",
  authentication,
  authorization,
  ProductController.editProduct
);
router.delete(
  "/admin/product/:id",
  authentication,
  authorization,
  ProductController.deleteProduct
);

router.use(errorHandling);
module.exports = router;
