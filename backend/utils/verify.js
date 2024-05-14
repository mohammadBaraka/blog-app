import jwt from "jsonwebtoken";
import { statusMessage } from "./status.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken || "";
  if (!token)
    return res.status(401).json({
      status: statusMessage.FAILD,
      message: "You Are Not Authenticated!",
    });
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        status: statusMessage.FAILD,
        message: "Invalid Token!",
      });
    req.id = user.id;
    req.name = user.name;
    next();
  });
};
