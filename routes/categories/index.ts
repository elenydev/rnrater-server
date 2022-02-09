import { Router } from "express";
import getRoutes from "./get/index";

const categoriesRoutes = Router();

categoriesRoutes.use("/categories/get/", getRoutes);

export default categoriesRoutes;
