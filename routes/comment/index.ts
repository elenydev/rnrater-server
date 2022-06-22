import { Router } from "express";
import postRoutes from "./post/index";
import getRoutes from "./get/index";
import deleteRoutes from "./delete/index"

const commentRoutes = Router();

postRoutes.use("/comment/post/", postRoutes);
getRoutes.use("/comment/get/", getRoutes);
deleteRoutes.use("/comment/delete/", deleteRoutes);

export default commentRoutes;
