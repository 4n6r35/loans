import { Router } from "express";
import SolicitudRouter from "./solicitud.router.js";
import { LoadHomeView } from "../controller/view.controller.js";

 const AppRoutes = Router();

AppRoutes.get('/', LoadHomeView )

AppRoutes.use("/request", SolicitudRouter)

export default AppRoutes 