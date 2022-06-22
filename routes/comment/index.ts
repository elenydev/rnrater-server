import { Router } from "express";
import postRoutes from "./post/index";

const commentRoutes = Router();

postRoutes.use("/comment/post/", postRoutes);

export default commentRoutes;
