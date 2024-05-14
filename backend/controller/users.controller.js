import { prisma } from "../db/prisma.js";
import { registerValidate } from "../utils/inputValidate.js";
import { statusMessage } from "../utils/status.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.users.findMany({
      include: { Post: true, Comment: true },
    });
    if (!allUsers.length)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "No Users Founded!",
      });
    const response = {
      status: statusMessage.SUCCESS,
      data: allUsers,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const getUsrById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id },
      include: { Post: true },
    });
    if (!user)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "User Not Found!",
      });
    const response = {
      status: statusMessage.SUCCESS,
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  const validation = registerValidate.safeParse({ name, email, password });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await prisma.users.update({
      where: { id },
      data: { name, email, password: hashedPass },
    });
    if (!user)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "User Not Found!",
      });
    const response = {
      status: statusMessage.SUCCESS,
      message: "User Updated Successfully!",
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.deleteMany({
      where: {
        userId: id,
      },
    });
    // get post's user
    await prisma.post.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.likes.deleteMany({
      where: {
        userId: id,
      },
    });

    const user = await prisma.users.delete({
      where: { id },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "User Deleted Successfully!",
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
