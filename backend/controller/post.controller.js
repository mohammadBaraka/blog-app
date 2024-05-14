import { prisma } from "../db/prisma.js";
import { postValidate } from "../utils/inputValidate.js";
import { statusMessage } from "../utils/status.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: { user: true, Likes: true, Comment: true },
      orderBy: { createdAt: "desc" },
      take: 5,
      skip: 0,
    });
    if (!allPosts.length)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "No Posts Founded!",
      });

    const response = {
      status: statusMessage.SUCCESS,
      data: allPosts,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error?.message,
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true, Likes: true, Comment: true },
    });
    if (!post)
      return res.status(400).json({
        status: statusMessage.FAILD,
        message: "Post Not Found!",
      });

    const response = {
      status: statusMessage.SUCCESS,
      data: post,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error?.message,
    });
  }
};

export const createPost = async (req, res) => {
  const { title, content, userId, categoryId } = req.body;
  const validation = postValidate.safeParse({ title, content, userId });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });
  try {
    const newPost = await prisma.post.create({
      data: { title, content, userId, categoryId },
    });

    const response = {
      status: statusMessage.SUCCESS,
      message: "Post Created Successfully!",
      data: newPost,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error?.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { title, content, userId } = req.body;
  const { id } = req.params;
  const validation = postValidate.safeParse({ title, content, userId });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, userId },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Post Updated Successfully!",
      data: post,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error?.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Post Deleted Successfully!",
      data: post,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error?.message,
    });
  }
};
