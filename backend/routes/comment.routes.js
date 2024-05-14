import express from "express";
import { verifyToken } from "../utils/verify.js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controller/comment.controller.js";

const router = express.Router();
router.route("/").post(verifyToken, createComment);
router
  .route("/:id")
  .put(verifyToken, updateComment)
  .delete(verifyToken, deleteComment);

export default router;
