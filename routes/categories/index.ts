import { Router } from "express";
import getRoutes from "./get/index";

const userRoutes = Router();

userRoutes.use("/categories/get/", getRoutes);

export default userRoutes;
