import { Router } from "express";
import postRoutes from "./post/index";
import getRoutes from "./get/index";
import deleteRoutes from "./delete/index"

const commentRoutes = Router();

commentRoutes.use("/comment/post/", postRoutes);
commentRoutes.use("/comment/get/", getRoutes);
commentRoutes.use("/comment/delete/", deleteRoutes);

export default commentRoutes;
