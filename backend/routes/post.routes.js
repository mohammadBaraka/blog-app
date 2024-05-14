import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();
router.route("/").get(getAllPosts);
router
  .route("/:id")
  .get(getPostById)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);
router.route("/").post(createPost);

export default router;
