import { prisma } from "../db/prisma.js";
import { statusMessage } from "../utils/status.js";

export const getAllLikes = async (req, res) => {
  try {
    const likes = await prisma.likes.findMany({
      include: {
        user: true,
        post: true,
      },
    });
    if (!likes.length)
      return res.status(404).json({ status: statusMessage.FAILD });
    res.status(200).json({ status: statusMessage.SUCCESS, data: likes });
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Find if the user has already liked this specific post
    const existingLike = await prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (!existingLike) {
      // If the user has not liked this post, add a like
      const addLike = await prisma.likes.create({
        data: {
          postId,
          userId,
        },
      });

      return res.status(201).json({
        status: statusMessage.SUCCESS,
        message: "Like Added Successfully!",
        data: addLike,
      });
    } else {
      // If the user has liked this post, delete the like
      const deleteLike = await prisma.likes.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.status(200).json({
        status: statusMessage.SUCCESS,
        message: "Like Deleted Successfully!",
        data: deleteLike,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
