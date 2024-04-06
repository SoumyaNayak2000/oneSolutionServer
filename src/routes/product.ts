import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//To Create New Product  - /api/v1/product/new
app.post("/new", isAdmin, singleUpload, newProduct);

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
app.get("/all-products", isAdmin, getAdminProducts);

// To get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(isAdmin, singleUpload, updateProduct)
  .delete(isAdmin, deleteProduct);

export default app;
