import { Router } from "express";
import getRoutes from "./get/index";
import postRoutes from "./post/index";
import putRoutes from './put/index';

const categoryPostRoutes = Router();

categoryPostRoutes.use("/categoryPost/get/", getRoutes);
categoryPostRoutes.use("/categoryPost/post/", postRoutes);
categoryPostRoutes.use('/categoryPost/put/', putRoutes)

export default categoryPostRoutes;
