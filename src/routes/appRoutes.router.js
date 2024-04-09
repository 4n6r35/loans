import { Router } from "express";
import SolicitudRouter from "./solicitud.router.js";

 const AppRoutes = Router();

AppRoutes.use("/request", SolicitudRouter)

export default AppRoutes 