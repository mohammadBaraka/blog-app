import { prisma } from "../db/prisma.js";
import { statusMessage } from "../utils/status.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { Post: true },
    });
    if (!categories.length)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "Not Categories Founded!",
      });
    const respnse = {
      status: statusMessage.SUCCESS,
      data: categories,
    };
    res.status(200).json(respnse);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { Post: true },
    });

    if (!category)
      return res.status(404).json({
        status: statusMessage.FAILD,
        message: "Category Not Found!",
      });
    const respnse = {
      status: statusMessage.SUCCESS,
      data: category,
    };
    res.status(200).json(respnse);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });

    const respnse = {
      status: statusMessage.SUCCESS,
      data: category,
    };
    res.status(200).json(respnse);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const category = await prisma.category.update({
      data: { name },
      where: { id },
    });

    const respnse = {
      status: statusMessage.SUCCESS,
      message: "Category Updated Successfully!",
      data: category,
    };
    res.status(200).json(respnse);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: { id },
    });

    const respnse = {
      status: statusMessage.SUCCESS,
      message: "Category Deleted Successfully!",
      data: category,
    };

    res.status(200).json(respnse);
  } catch (error) {
    res.status(500).json({
      status: statusMessage.SERVER_ERROR,
      message: error.message,
    });
  }
};
