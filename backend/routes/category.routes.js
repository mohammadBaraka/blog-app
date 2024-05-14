import express from "express";
import { verifyToken } from "../utils/verify.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controller/category.controller.js";
const router = express.Router();
router.route("/").get(getCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);
router.route("/").post(verifyToken, createCategory);
export default router;
