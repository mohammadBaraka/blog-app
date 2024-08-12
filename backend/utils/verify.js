import jwt from "jsonwebtoken";
import { statusMessage } from "./status.js";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token)
      return res.status(403).json({
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
      console.log(user?.id);
      next();
    });
  } catch (error) {
    return res.status(401).send({ message: "Invalid token!" });
  }
};

// export const jwtVerify = (req, res, next) => {
//   try {
//     const token = req.cookies?.access_token;
//     if (!token) return res.status(403).json("Unauthorized");
//     jwt.verify(token, process.env.JWT, (err, decoded) => {
//       if (err) return res.status(400).json("Access denied");
//       req.userId = decoded._id;
//       req.isAdmin = decoded.isAdmin;
//       next();
//     });
//   } catch (error) {
//     return res.status(401).send({ message: "Invalid token!" });
//   }
// };
