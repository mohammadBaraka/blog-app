import { prisma } from "../db/prisma.js";
import { statusMessage } from "../utils/status.js";

// Toggle Likes
export const toggleLike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const finduserLiked = await prisma.likes.findFirst({
      where: { userId },
    });

    if (!finduserLiked?.userId) {
      const addLike = await prisma.likes.create({
        data: { postId, userId },
      });
      return res.status(201).json({
        status: statusMessage.SUCCESS,
        message: "Like Added Successfully!",
        data: addLike,
      });
    } else {
      const deleteLike = await prisma.likes.deleteMany({
        where: { userId },
      });
      res.status(200).json({
        status: statusMessage.SUCCESS,
        message: "Like Deleted Successfully!",
        data: deleteLike,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
