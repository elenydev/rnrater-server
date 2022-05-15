import { Router } from "express";
import getRoutes from "./get/index";
import postRoutes from "./post/index";

const categoryPostRoutes = Router();

categoryPostRoutes.use("/categoryPost/get/", getRoutes);
categoryPostRoutes.use("/categoryPost/post/", postRoutes);

export default categoryPostRoutes;
