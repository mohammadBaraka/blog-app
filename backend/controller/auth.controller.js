import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.js";
import { loginValidate, registerValidate } from "../utils/inputValidate.js";
import { statusMessage } from "../utils/status.js";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  //?======================VALIDATION====================================
  const validation = registerValidate.safeParse({ name, email, password });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });

  try {
    //?======================CHECK IF THE USER EXISTS====================================
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser)
      return res
        .status(400)
        .json({ status: statusMessage.FAILD, message: "User Already Exists!" });

    //?======================CREATE NEW USER====================================
    const hasedPass = await bcrypt.hash(password, 10);
    // const file = req.file.filename;
    // const basePath = `${req.protocol}://${req.get(
    //   "host"
    // )}/public/upload/${file}`;
    const newUser = await prisma.users.create({
      data: { name, email, password: hasedPass },
    });

    const response = {
      status: statusMessage.SUCCESS,
      message: "Signup Successfully!",
      data: {
        ...newUser,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: statusMessage.SERVER_ERROR, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  //?======================VALIDATION====================================
  const validation = loginValidate.safeParse({ email, password });
  if (!validation.success)
    return res.status(400).json({
      status: statusMessage.FAILD,
      message: validation.error.errors[0].message,
    });
  try {
    //?======================CHECK IF THE USER NOT EXISTS====================================
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (!existingUser)
      return res.status(400).json({
        status: statusMessage.FAILD,
        message: "User Not Already Exists!",
      });

    //?======================CHECK IF THE PASSWORD IS CORRECT====================================
    const passIsMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passIsMatch)
      return res.status(400).json({
        status: statusMessage.FAILD,
        message: "Invalid Email Or Password!",
      });

    //?======================SET TOKEN ON COOKIE====================================
    const token = jwt.sign(
      { id: existingUser.id, name: existingUser.name },
      process.env.SECRET_KEY
    );
    // res.setHeader(
    //   "Set-Cookie",
    //   serialize("accessToken", token, {
    //     httpOnly: true,
    //     sameSite: "none",
    //     secure: process.env.NODE_ENV === "production",
    //     path: "/",
    //     maxAge: 60 * 60 * 24,
    //   })
    // );
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    const response = {
      status: statusMessage.SUCCESS,
      message: "Login Successfully!",
      data: {
        ...existingUser,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: statusMessage.SERVER_ERROR, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res
      .status(200)
      .json({ status: statusMessage.SUCCESS, message: "Logout Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: statusMessage.SERVER_ERROR, message: error.message });
  }
};

export const sendToken = async (req, res) => {
  try {
    return res.status(200).json({
      status: statusMessage.SUCCESS,
      id: req.id,
      name: req.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: statusMessage.SERVER_ERROR, message: error.message });
  }
};
