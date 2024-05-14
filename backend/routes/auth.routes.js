import express from "express";
import {
  login,
  logout,
  register,
  sendToken,
} from "../controller/auth.controller.js";
import upload from "../utils/upload.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();
router.route("/sendToken").get(verifyToken, sendToken);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
