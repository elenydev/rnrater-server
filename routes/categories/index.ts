import { Router } from "express";
import getRoutes from "./get/index";
import postRoutes from './post/index';

const categoriesRoutes = Router();

categoriesRoutes.use("/categories/get/", getRoutes);
categoriesRoutes.use('/categories/post/', postRoutes);

export default categoriesRoutes;
