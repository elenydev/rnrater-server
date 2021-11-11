import { Router } from "express";
import postRoutes from "./post/index";

const userRoutes = Router();

userRoutes.use("/user/post/", postRoutes);

export default userRoutes;