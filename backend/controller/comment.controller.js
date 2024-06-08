import { prisma } from "../db/prisma.js";
import { commentValidate } from "../utils/inputValidate.js";
import { statusMessage } from "../utils/status.js";
export const getAllComents = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { user: true, post: true },
    });
    if (!comments.length)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "No Comments Founded!",
      });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Comments Fetched Successfully!",
      data: comments,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
export const createComment = async (req, res) => {
  const { content, userId, postId } = req.body;
  const validation = commentValidate.safeParse({ content, userId, postId });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });
  try {
    const comment = await prisma.comment.create({
      data: { content, userId, postId },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Comment Added Successfully!",
      data: comment,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  const { content, userId, postId } = req.body;
  const { id } = req.params;
  const validation = commentValidate.safeParse({ content, userId, postId });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content, userId, postId },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Comment Updated Successfully!",
      data: comment,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.delete({
      where: { id },
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Comment Deleted Successfully!",
      data: comment,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
