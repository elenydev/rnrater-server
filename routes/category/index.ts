import { Router } from "express";
import getRoutes from "./get/index";
import postRoutes from './post/index';

const categoriesRoutes = Router();

categoriesRoutes.use("/category/get/", getRoutes);
categoriesRoutes.use('/category/post/', postRoutes);

export default categoriesRoutes;
