import { Router } from "express";
import getRoutes from "./get/index";

const categoryPostRoutes = Router();

categoryPostRoutes.use("/categoryPost/get/", getRoutes);

export default categoryPostRoutes;
