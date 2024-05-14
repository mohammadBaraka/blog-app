import express from "express";
import { verifyToken } from "../utils/verify.js";
import {
  deleteUser,
  getAllUsers,
  getUsrById,
  updateUser,
} from "../controller/users.controller.js";

const router = express.Router();
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getUsrById)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);
export default router;
