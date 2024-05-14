import express from "express";
import { toggleLike } from "../controller/likes.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();
router.route("/").post(verifyToken, toggleLike);
export default router;
