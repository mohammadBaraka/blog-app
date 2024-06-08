import express from "express";
import { verifyToken } from "../utils/verify.js";
import {
  createComment,
  deleteComment,
  getAllComents,
  updateComment,
} from "../controller/comment.controller.js";

const router = express.Router();
router.route("/").post(createComment).get(getAllComents);
router.route("/:id").put(updateComment).delete(deleteComment);

export default router;
