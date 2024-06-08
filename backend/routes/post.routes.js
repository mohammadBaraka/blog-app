import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByCategoryId,
  updatePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();
router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);
router.route("/category/:id").get(getPostsByCategoryId);
export default router;
