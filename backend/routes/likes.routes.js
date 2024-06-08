import express from "express";
import { getAllLikes, toggleLike } from "../controller/likes.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();
router.route("/").get(getAllLikes);
router.route("/").post(toggleLike);
export default router;
