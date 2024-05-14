import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//?====================ROUTES=======================
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/users.routes.js";
import commetRoutes from "./routes/comment.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import likesRoutes from "./routes/likes.routes.js";
app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commetRoutes);
app.use("/categories", categoriesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
