import { Router } from "express";
import postRoutes from "./post/index";
import getRoutes from "./get/index";

const userRoutes = Router();

userRoutes.use("/user/post/", postRoutes);
userRoutes.use("/user/get/", getRoutes);

export default userRoutes;
